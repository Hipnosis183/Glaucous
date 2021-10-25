import GamePlatformModel from '../models/GamePlatform'
import GameRegionModel from '../models/GameRegion'
import GameVersionModel from '../models/GameVersion'
import { generateID } from '../datastore'
import { getDeveloper, getDeveloperByName } from './Developer'
import { getPlatform, getPlatformAllByName, getPlatformsGroup } from './Platform'
import { getFavorites, getPlaylist, getRecent, removeGameUser } from './User'

import { app } from '@electron/remote'
import { copySync, ensureDirSync, moveSync, outputFileSync, readdirSync, remove, removeSync } from 'fs-extra'

import Regions from '../../../public/files/flags.json'

// Declare game variables.
let gamePlatform
let gameRegion
let gameVersion

// Create a new game platform.
export async function newGamePlatform(req, id) {
    // Create a version for the game.
    await createGameVersion(req.gameVersion)
    // Create a region for the game.
    await createGameRegion(req.gameRegion)
    // Create platform for the game.
    await createGamePlatform(req.gamePlatform)
    // Store uploaded images for the game.
    let imagesPath = req.gamePlatform.platform + '/' + gamePlatform
    await storeImages(req.gamePlatform.images, imagesPath)
    await storeImages(req.gameRegion.images, imagesPath + '/games/' + gameRegion)
    await storeImages(req.gameVersion.images, imagesPath + '/games/' + gameRegion + '/games/' + gameVersion)
    // Store links for the game.
    await storeLinks(req.gamePlatform)
    // Link to other games if an ID is given.
    if (id) await getGamePlatform(gamePlatform)
        .then(async (res) => {
            await linkGame(res, id)
        })
}

// Create a new game region.
export async function newGameRegion(req, id) {
    // Create a version for the game.
    await createGameVersion(req.gameVersion)
    // Create a region for the game.
    await createGameRegion(req.gameRegion)
    // Update platform for the game.
    await getGamePlatform(id.gamePlatform)
        .then(async (res) => {
            res.gameRegions.push(gameRegion)
            await GamePlatformModel.findOneAndUpdate({ _id: id.gamePlatform }, { gameRegions: res.gameRegions })
            // Store uploaded images for the game.
            let imagesPath = res.platform + '/' + id.gamePlatform + '/games/' + gameRegion
            await storeImages(req.gameRegion.images, imagesPath)
            await storeImages(req.gameVersion.images, imagesPath + '/games/' + gameVersion)
        })
}

// Create a new game version.
export async function newGameVersion(req, pla, id) {
    // Create a version for the game.
    await createGameVersion(req.gameVersion)
    // Update region for the game.
    await GameRegionModel.findOne({ _id: id.gameRegion }, { populate: false })
        .then(async (res) => {
            res.gameVersions.push(gameVersion)
            await GameRegionModel.findOneAndUpdate({ _id: id.gameRegion }, { gameVersions: res.gameVersions })
            // Store uploaded images for the game.
            let imagesPath = pla + '/' + id.gamePlatform + '/games/' + id.gameRegion + '/games/' + gameVersion
            await storeImages(req.gameVersion.images, imagesPath)
        })
}

// Create a specific game for a determined platform.
async function createGamePlatform(req) {
    gamePlatform = generateID()
    // Create game platform model.
    const GamePlatform = GamePlatformModel.create({
        _id: gamePlatform,
        gamePlatforms: new Array(gamePlatform),
        gameRegions: new Array(gameRegion),
        developer: req.developer,
        platform: req.platform,
        releaseYear: req.releaseYear,
        numberPlayers: req.numberPlayers
    })
    // Save model to database.
    await GamePlatform.save()
}

// Create a specific region for a determined game.
async function createGameRegion(req) {
    // Create game region model.
    const GameRegion = GameRegionModel.create({
        _id: generateID(),
        gameVersions: new Array(gameVersion),
        title: req.title,
        preTitle: req.preTitle,
        subTitle: req.subTitle,
        originalTitle: req.originalTitle,
        romanizedTitle: req.romanizedTitle,
        translatedTitle: req.translatedTitle,
        region: req.region,
        serial: req.serial
    })
    // Save model to database.
    await GameRegion.save()
        // Store region id.
        .then((res) => gameRegion = res._id)
}

// Create a specific version for a determined region.
async function createGameVersion(req) {
    // Create game version model.
    const GameVersion = GameVersionModel.create({
        _id: generateID(),
        name: req.name,
        number: req.number,
        latest: req.latest,
        comments: req.comments
    })
    // Save model to database.
    await GameVersion.save()
        // Store version id.
        .then((res) => gameVersion = res._id)
}

// Update the specified game.
export async function updateGame(req, id) {
    // Store current game object state before updating the data.
    const old = await GamePlatformModel.findOne({ _id: id.gamePlatform }, { populate: false })
    // Update the game platform.
    await GamePlatformModel.findOneAndUpdate({ _id: id.gamePlatform }, {
        developer: req.gamePlatform.developer,
        platform: req.gamePlatform.platform,
        releaseYear: req.gamePlatform.releaseYear,
        numberPlayers: req.gamePlatform.numberPlayers
    })
    // Update the game region.
    await GameRegionModel.findOneAndUpdate({ _id: id.gameRegion }, {
        title: req.gameRegion.title,
        preTitle: req.gameRegion.preTitle,
        subTitle: req.gameRegion.subTitle,
        originalTitle: req.gameRegion.originalTitle,
        romanizedTitle: req.gameRegion.romanizedTitle,
        translatedTitle: req.gameRegion.translatedTitle,
        region: req.gameRegion.region,
        serial: req.gameRegion.serial
    })
    // Update the game version.
    await GameVersionModel.findOneAndUpdate({ _id: id.gameVersion }, {
        name: req.gameVersion.name,
        number: req.gameVersion.number,
        latest: req.gameVersion.latest,
        comments: req.gameVersion.comments
    })
    // Update stored images for the game.
    let imagesPath = old.platform + '/' + id.gamePlatform
    await updateImages(req.gamePlatform.images, imagesPath)
    await updateImages(req.gameRegion.images, imagesPath + '/games/' + id.gameRegion)
    await updateImages(req.gameVersion.images, imagesPath + '/games/' + id.gameRegion + '/games/' + id.gameVersion)
    // Update stored links for the game.
    await storeLinks(req.gamePlatform, id.gamePlatform)
    // Update game store directory.
    await updateStore(req.gamePlatform.platform, old.platform, id.gamePlatform)
}

// Delete the specified game platform and all its related data.
export async function deleteGamePlatform(req, p, del) {
    if (!del) {
        // Delete all the game regions of the game platform.
        for (let r of req.gameRegions) {
            // Delete all the game versions of the game region.
            for (let v of r.gameVersions) {
                await GameVersionModel.findOneAndDelete({ _id: p ? v : v._id })
            }
            await GameRegionModel.findOneAndDelete({ _id: r._id })
        }
    }
    // Unlink game.
    await unlinkGame(req, true)
    // Remove game platform's data.
    remove(app.getAppPath() + '/data/' + req.platform._id + '/' + req._id)
    // Remove game from all user lists.
    await removeGameUser(req)
}

// Delete the specified game region and all its related data.
export async function deleteGameRegion(req, i, del) {
    if (!del) {
        // Delete all the game versions of the game region.
        for (let v of req.gameRegions[i].gameVersions) {
            await GameVersionModel.findOneAndDelete({ _id: v._id })
        }
    }
    // Delete the game region.
    await GameRegionModel.findOneAndDelete({ _id: req.gameRegions[i]._id })
    // Manage deletion with none or multiple game regions left.
    if ((req.gameRegions.length - 1) > 0) {
        // Update platform for the game.
        await getGamePlatform(req._id)
            .then(async (res) => {
                let index = res.gameRegions.indexOf(req.gameRegions[i]._id)
                res.gameRegions.splice(index, 1)
                await GamePlatformModel.findOneAndUpdate({ _id: req._id }, { gameRegions: res.gameRegions })
            })
        // Remove game region data.
        remove(app.getAppPath() + '/data/' + req.platform._id + '/' + req._id + '/games/' + req.gameRegions[i]._id)
        // There are other regions for the platform.
        return true
    }
    else {
        // Delete game platform.
        await deleteGamePlatform(req, true, true)
        // There are no other regions for the platform.
        return false
    }
}

// Delete the specified game version and all its related data.
export async function deleteGameVersion(req, r, v) {
    // Delete the game version.
    await GameVersionModel.findOneAndDelete({ _id: req.gameRegions[r].gameVersions[v]._id })
    // Manage deletion with none or multiple game versions left.
    if ((req.gameRegions[r].gameVersions.length - 1) > 0) {
        // Update region for the game.
        await GameRegionModel.findOne({ _id: req.gameRegions[r]._id }, { populate: false })
            .then(async (res) => {
                let index = res.gameVersions.indexOf(req.gameRegions[r].gameVersions[v]._id)
                res.gameVersions.splice(index, 1)
                await GameRegionModel.findOneAndUpdate({ _id: res._id }, { gameVersions: res.gameVersions })
            })
        // Remove game version data.
        remove(app.getAppPath() + '/data/' + req.platform._id + '/' + req._id + '/games/' + req.gameRegions[r]._id + '/games/' + req.gameRegions[r].gameVersions[v]._id)
        // There are other versions for the region.
        return true
    }
    else {
        // Delete game region.
        return await deleteGameRegion(req, r, true)
    }
}

// Delete all the games from the specified developer.
export async function deleteGamesDeveloper(req) {
    await GamePlatformModel.find({ developer: req })
        .then(async (res) => {
            // Delete all the game platforms of the developer.
            for (let gamePlatform of res) {
                await deleteGamePlatform(gamePlatform, true)
            }
        })
}

// Delete all the games from the specified platform.
export async function deleteGamesPlatform(req) {
    await GamePlatformModel.find({ platform: req })
        .then(async (res) => {
            // Delete all the game platforms of the platform.
            for (let gamePlatform of res) {
                await deleteGamePlatform(gamePlatform, true)
            }
            // Remove platform data.
            remove(app.getAppPath() + '/data/' + req)
        })
}

// Store images for a specific game.
async function storeImages(images, path) {
    // Set image path for a specific game.
    let imagesPath = app.getAppPath() + '/data/' + path + '/images'
    // Ensure images directory creation, even if there are no images.
    ensureDirSync(imagesPath)
    // Add cover image file.
    if (images.cover.add) {
        // Copy cover image file. It starts with eight zeroes, followed by eight random characters.
        copySync(images.cover.add[0], imagesPath + '/' + '0'.repeat(8) + generateID().substr(0, 8))
    }
    // Add background image file.
    if (images.background.add) {
        // Copy background image file. It starts with eight ones, followed by eight random characters.
        copySync(images.background.add[0], imagesPath + '/' + '1'.repeat(8) + generateID().substr(0, 8))
    }
    // Add pictures image files.
    for (let [i, image] of images.pictures.add.entries()) {
        copySync(image, imagesPath + '/' + i.toString(16).toUpperCase().padStart(2, '0') + generateID().substr(0, 14))
    }
}

// Update stored images for a specific game.
async function updateImages(images, path) {
    // Set image path for a specific game.
    let imagesPath = app.getAppPath() + '/data/' + path + '/images'
    // Ensure images directory creation, even if there are no images.
    ensureDirSync(imagesPath)
    // Remove cover image file.
    if (images.cover.remove) {
        // The cover image file starts with eight zeroes, followed by eight random characters.
        removeSync(imagesPath + '/' + readdirSync(imagesPath).filter((res) => res.startsWith('0'.repeat(8)))[0])
    }
    // Add cover image file.
    if (images.cover.add) {
        // Remove any previously stored cover image file.
        removeSync(imagesPath + '/' + readdirSync(imagesPath).filter((res) => res.startsWith('0'.repeat(8)))[0])
        // Copy cover image file, using cache busting for proper rendering update.
        copySync(images.cover.add[0], imagesPath + '/' + '0'.repeat(8) + generateID().substr(0, 8))
    }
    // Remove background image file.
    if (images.background.remove) {
        // The background image file starts with eight ones, followed by eight random characters.
        removeSync(imagesPath + '/' + readdirSync(imagesPath).filter((res) => res.startsWith('1'.repeat(8)))[0])
    }
    // Add background image file.
    if (images.background.add) {
        // Remove any previously stored background image file.
        removeSync(imagesPath + '/' + readdirSync(imagesPath).filter((res) => res.startsWith('1'.repeat(8)))[0])
        // Copy background image file, using cache busting for proper rendering update.
        copySync(images.background.add[0], imagesPath + '/' + '1'.repeat(8) + generateID().substr(0, 8))
    }
    // Remove pictures image files.
    for (let image of images.pictures.remove) {
        removeSync(imagesPath + '/' + image)
    }
    // Add pictures image files.
    let i = readdirSync(imagesPath).filter((res) => !res.startsWith('0'.repeat(8))).length + 1
    for (let image of images.pictures.add) {
        copySync(image, imagesPath + '/' + i.toString(16).toUpperCase().padStart(2, '0') + generateID().substr(0, 14))
        i++
    }
}

// Store links for a specific game.
async function storeLinks(req, id) {
    // Set game platform ID.
    gamePlatform = id ? id : gamePlatform
    // Create links object.
    let linksFile = ''
    for (let [i, link] of req.links.entries()) {
        // Add link to object.
        linksFile += link + (i != req.links.length - 1 ? '\n' : '')
    }
    // Ensure link icons directory creation.
    ensureDirSync(app.getAppPath() + '/assets/links/')
    // Create links file.
    outputFileSync(app.getAppPath() + '/data/' + req.platform + '/' + gamePlatform + '/links', linksFile)
}

// Move the game directory if the developer has changed.
async function updateStore(platform, old, game) {
    if (platform != old) {
        let pathOld = app.getAppPath() + '/data/' + old + '/' + game
        let pathNew = app.getAppPath() + '/data/' + platform + '/' + game
        moveSync(pathOld, pathNew, { overwrite: true })
    }
}

// Manage game linking.
export async function linkGame(req, sid) {
    // Get selected game.
    let selectedGame = await getGamePlatform(sid)
    // Concatenate the current and the selected games' game platforms.
    let linkedGames = req.gamePlatforms.concat(selectedGame.gamePlatforms)
    // Update the game platforms of all the linked games.
    for (let linkedGame of linkedGames) {
        await GamePlatformModel.findOneAndUpdate({ _id: linkedGame }, { gamePlatforms: linkedGames })
    }
    // Return list to display in UI.
    return linkedGames
}

// Manage game unlinking.
export async function unlinkGame(req, del) {
    // Get only the linked games.
    let linkedGames = req.gamePlatforms.filter((res) => res != req._id)
    if (del) {
        // Delete the game platform.
        await GamePlatformModel.findOneAndDelete({ _id: req._id })
    } else {
        // Update the game platform.
        await GamePlatformModel.findOneAndUpdate({ _id: req._id }, { gamePlatforms: new Array(req._id) })
    }
    // Delete the game platform from the linked games.
    for (let linkedGame of linkedGames) {
        await GamePlatformModel.findOneAndUpdate({ _id: linkedGame }, { gamePlatforms: linkedGames })
    }
}

// Reorder a game regions array to select one as the default.
export async function selectGameRegion(req, index) {
    let gameRegions = []
    // Get all game regions IDs.
    for (let gameRegion of req.gameRegions) {
        gameRegions.push(gameRegion._id)
    }
    // Create new sorted array.
    let gameRegionsSorted = new Array(gameRegions[index])
    gameRegionsSorted = gameRegionsSorted.concat(gameRegions.filter((res) => res != gameRegions[index]))
    // Update the game platform.
    await GamePlatformModel.findOneAndUpdate({ _id: req._id }, { gameRegions: gameRegionsSorted })
}

// Get a specific game platform.
export async function getGamePlatform(req) {
    return await GamePlatformModel.findOne({ _id: req }, { populate: false })
}

// Get the count of game platforms belonging to a specific developer.
export async function getGamePlatformCountD(req) {
    return await GamePlatformModel.count({ developer: req }, { populate: false })
}

// Get the count of game platforms belonging to a specific platform.
export async function getGamePlatformCountP(req) {
    return await GamePlatformModel.count({ platform: req }, { populate: false })
}

// Get a specific game region.
export async function getGameRegion(req) {
    return await GameRegionModel.findOne({ _id: req }, { populate: true })
}

// Get a specific game version.
export async function getGameVersion(req) {
    return await GameVersionModel.findOne({ _id: req }, { populate: false })
}

// Get a specific game.
export async function getGame(req) {
    // Since 'gameVersion' is the last object in the tree,
    // there's no need to populate it manually.
    let gameRegions = []
    return await getGamePlatform(req)
        .then(async (res) => {
            // Loop through all the items in 'res.gameRegions[]'.
            for (let gameRegion of res.gameRegions) {
                await getGameRegion(gameRegion)
                    // Populate each item with its data.
                    .then((res) => {
                        res.regionName = getRegion(res.region)
                        gameRegions.push(res)
                    })
            }
            await getDeveloper(res.developer)
                .then((dev) => res.developer = dev)
            await getPlatform(res.platform)
                .then((pla) => res.platform = pla)
            res.gameRegions = gameRegions
            res.image = getImage(res)
            // Return populated object.
            return res
        })
}

// Get all games.
export async function getGamesAll(index, count, query, sort) {
    // Configure the search query.
    const search = query ? query : {}
    const sorting = sort ? 'title' : ''
    // Search game regions first to be able to sort elements by title.
    return await GameRegionModel.find(search, { skip: index, limit: count, sort: sorting, populate: false })
        .then(async (res) => {
            let gamePlatforms = []
            for (let gameRegion of res) {
                // Populate the required game platform data for the region.
                await GamePlatformModel.findOne({ gameRegions: gameRegion._id }, { populate: true })
                    .then((pla) => {
                        // Avoid returning all regions of the game.
                        if (pla.gameRegions[0]._id == gameRegion._id) {
                            pla.gameRegions[0] = gameRegion
                            pla.image = getImage(pla)
                            gamePlatforms.push(pla)
                        }
                    })
            }
            return gamePlatforms
        })
}

// Get all games matching a given search query.
export async function getGamesAllSearch(index, count, query) {
    // Configure the search parameters.
    const search = new RegExp(query, 'i')
    // Configure the search query.
    const querySearch = { $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { translatedTitle: search }] }
    // Get all game regions for the selected platform.
    return await getGamesAll(index, count, querySearch, true)
}

// Get all games by a specific developer.
export async function getGamesDeveloper(req, index, count, query) {
    let gameRegions = []
    // Search all game platforms for the selected developer.
    return await GamePlatformModel.find({ developer: req }, { populate: false, select: ['gameRegions'] })
        .then(async (res) => {
            for (let gamePlatform of res) {
                // Store default region for the sorted search.
                gameRegions.push(gamePlatform.gameRegions[0])
            }
            // Configure the search parameters.
            const search = new RegExp(query, 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { translatedTitle: search }] }
            // Get all game regions for the selected platform.
            return await getGamesAll(index, count, querySearch, true)
        })
}

// Get all games by a specific platform.
export async function getGamesPlatform(req, index, count, query) {
    let gameRegions = []
    // Search all game platforms for the selected platform.
    return await GamePlatformModel.find({ platform: req }, { populate: false, select: ['gameRegions'] })
        .then(async (res) => {
            for (let gamePlatform of res) {
                // Store default region for the sorted search.
                gameRegions.push(gamePlatform.gameRegions[0])
            }
            // Configure the search parameters.
            const search = new RegExp(query, 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { translatedTitle: search }] }
            // Get all game regions for the selected platform.
            return await getGamesAll(index, count, querySearch, true)
        })
}

// Get all games by a specific amount of players.
export async function getGamesPlayers(req, index, count, query) {
    let gameRegions = []
    // Search all game platforms for the selected platform.
    return await GamePlatformModel.find({ numberPlayers: req }, { populate: false, select: ['gameRegions'] })
        .then(async (res) => {
            for (let gamePlatform of res) {
                // Store default region for the sorted search.
                gameRegions.push(gamePlatform.gameRegions[0])
            }
            // Configure the search parameters.
            const search = new RegExp(query, 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { translatedTitle: search }] }
            // Get all game regions for the selected platform.
            return await getGamesAll(index, count, querySearch, true)
        })
}

let platforms = []

// Get all games matching a given search query.
export async function getGamesSearch(index, count, query) {
    // Configure the search parameters.
    const search = {
        title: new RegExp(query.title, 'i'),
        platform: new RegExp(query.platform, 'i'),
        developer: new RegExp(query.developer, 'i'),
        releaseYear: new RegExp(query.releaseYear, 'i')
    }
    platforms = []
    // Get all platforms matching the given query.
    await getPlatformAllByName(search.platform)
        .then(async (res) => {
            await getGamesSearchPlatform(res)
        })
    let developers = []
    // Get all developers matching the given query.
    await getDeveloperByName(search.developer)
        .then((res) => {
            for (let developer of res) {
                // Store the developer IDs.
                developers.push(developer._id)
            }
        })
    let gameRegions = []
    // Search all game platforms matching the selected developer and platform.
    await GamePlatformModel.find({ $and: [{ platform: { $in: platforms }, developer: { $in: developers }, releaseYear: search.releaseYear }] }, { populate: false, select: ['gameRegions'] })
        .then((res) => {
            for (let gamePlatform of res) {
                // Store default region for the sorted search.
                gameRegions.push(gamePlatform.gameRegions[0])
            }
        })
    // Configure the search query.
    const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search.title }, { preTitle: search.title }, { subTitle: search.title }, { translatedTitle: search.title }] }
    // Get all the game regions matching the search query.
    return await getGamesAll(index, count, querySearch, true)
}

// Get all (nested) platforms for a specific search query.
async function getGamesSearchPlatform(res) {
    for (let platform of res) {
        // Check if the platform is a group.
        if (platform.group) {
            await getPlatformsGroup(platform._id)
                .then(async (res) => {
                    // Recurse the function to get nested platforms.
                    await getGamesSearchPlatform(res)
                })
        } else {
            // Store the platform IDs.
            platforms.push(platform._id)
        }
    }
}

// Get all linked games of a specific game platform.
export async function getGamesLinked(req) {
    return await GamePlatformModel.find({ _id: { $in: req } }, { populate: ['gameRegions', 'developer', 'platform'] })
        .then((res) => {
            let gamePlatforms = []
            for (let gameLinked of res) {
                // Get game configuration.
                gameLinked.image = getImage(gameLinked)
                gamePlatforms.push(gameLinked)
            }
            return gamePlatforms
        })
}

// Get all linked games matching a given search query.
export async function getGamesLinkedSearch(req, query) {
    // Configure the search parameters.
    const search = new RegExp(query, 'i')
    // Configure the search query.
    const querySearch = { $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { translatedTitle: search }] }
    // Search through game regions, case insensitive.
    return await GameRegionModel.find(querySearch)
        .then(async (res) => {
            let idBlacklist = []
            let gamePlatforms = []
            let platforms = []
            for (let gameRegion of res) {
                // Search the parent game platform of the game region.
                await GamePlatformModel.findOne({ gameRegions: gameRegion._id }, { populate: ['developer', 'platform'] })
                    .then(async (res) => {
                        // Avoid returning already linked games.
                        if (!req.includes(res._id)) {
                            // Avoid returning all regions of a game.
                            if (!idBlacklist.includes(res._id)) {
                                // Populate parent with the region.
                                res.child = gameRegion
                                // Get linked games' platforms names.
                                for (let gamePlatform of res.gamePlatforms) {
                                    await GamePlatformModel.findOne({ _id: gamePlatform }, { select: ['platform'], populate: ['platform'] })
                                        .then((res) => platforms.push(res.platform.name))
                                }
                                res.platforms = platforms
                                // Add game to return array.
                                gamePlatforms.push(res)
                                // Blacklist IDs.
                                idBlacklist = idBlacklist.concat(res.gamePlatforms)
                                // Reset platforms names list.
                                platforms = []
                            }
                        }
                    })
            }
            // Return search results.
            return gamePlatforms
        })
}

// Get all favorited games.
export async function getGamesFavorited(index, count, query) {
    let gameRegions = []
    const gamesFavorited = await getFavorites()
    // Search all favorited game platforms.
    return await GamePlatformModel.find({ _id: { $in: gamesFavorited } }, { populate: false, select: ['gameRegions'] })
        .then(async (res) => {
            for (let gamePlatform of res) {
                // Store default region for the sorted search.
                gameRegions.push(gamePlatform.gameRegions[0])
            }
            // Configure the search parameters.
            const search = new RegExp(query, 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { translatedTitle: search }] }
            // Get all favorited games.
            return await getGamesAll(index, count, querySearch, true)
        })
}

// Get all favorited games.
export async function getGamesRecent(index, count, query) {
    let gameRegions = []
    const gamesRecent = await getRecent()
    // Search all favorited game platforms.
    return await GamePlatformModel.find({ _id: { $in: gamesRecent } }, { populate: false, select: ['gameRegions'] })
        .then(async (res) => {
            for (let gamePlatform of res) {
                // Store default region for the sorted search.
                gameRegions.push(gamePlatform.gameRegions[0])
            }
            // Configure the search parameters.
            const search = new RegExp(query, 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { translatedTitle: search }] }
            // Get all favorited games.
            return await getGamesAll(index, count, querySearch)
        })
}

// Get all games by a specific playlist.
export async function getGamesPlaylist(req, index, count, query) {
    let gameRegions = []
    const gamesPlaylist = await getPlaylist(req)
    // Search all game platforms included in the playlist.
    return await GamePlatformModel.find({ _id: { $in: gamesPlaylist.games } }, { populate: false, select: ['gameRegions'] })
        .then(async (res) => {
            for (let gamePlatform of res) {
                // Store default region for the sorted search.
                gameRegions.push(gamePlatform.gameRegions[0])
            }
            // Configure the search parameters.
            const search = new RegExp(query, 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { translatedTitle: search }] }
            // Get all playlist games.
            return await getGamesAll(index, count, querySearch, true)
        })
}

// Get cover image for a specific game.
function getImage(game) {
    // Create image object.
    let image = { cover: true }
    // Define game version ID variable depending on the context.
    let gameVer = game.gameRegions[0].gameVersions[0]._id ? game.gameRegions[0].gameVersions[0]._id : game.gameRegions[0].gameVersions[0]
    // Set the image directory path of the game platform.
    let gamePath = app.getAppPath() + '/data/' + game.platform._id + '/' + game._id
    let imagePath = gamePath + '/games/' + game.gameRegions[0]._id + '/games/' + gameVer + '/images'
    ensureDirSync(imagePath)
    // Check if there are images for the selected game version.
    if (!readdirSync(imagePath).length > 0) {
        imagePath = gamePath + '/games/' + game.gameRegions[0]._id + '/images'
        ensureDirSync(imagePath)
        // Check if there are images for the selected game region.
        if (!readdirSync(imagePath).length > 0) {
            imagePath = gamePath + '/images'
            ensureDirSync(imagePath)
        }
    }
    // Load images filenames and filter the cover image file.
    let imageFile = readdirSync(imagePath).filter((res) => res.startsWith('0'.repeat(8)))[0]
    // Load first picture image as cover if it doesn't exists.
    if (!imageFile) {
        imageFile = readdirSync(imagePath).filter((res) => !res.startsWith('0'.repeat(8)))[0]
        image.cover = false
    }
    // Set full image cover path.
    image.path = imageFile ? (imagePath + '/' + imageFile) : false
    return image
}

// Get the name for the requested region code.
function getRegion(reg) {
    // Filter code from array.
    let region = Regions.filter((res) => res.code == reg)
    // Return the name property.
    return region.length > 0 ? region[0].name : 'Unknown'
}