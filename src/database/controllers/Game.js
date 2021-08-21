import GamePlatformModel from '../models/GamePlatform'
import GameRegionModel from '../models/GameRegion'
import GameVersionModel from '../models/GameVersion'
import { generateID } from '../datastore'
import {
    getDeveloper,
    getDeveloperByName
} from './Developer'
import {
    getPlatform,
    getPlatformByName
} from './Platform'

import { app } from '@electron/remote'
import {
    copySync,
    ensureDirSync,
    outputFileSync,
    readdirSync,
    remove,
    removeSync
} from 'fs-extra'

import Regions from '../../../public/files/flags.json'

let Platform
let Region
let Version

// Create a new game platform.
export async function newGamePlatform(req, id) {
    // Create a version for the game.
    await createGameVersion(req.gameVersion)
    // Create a region for the game.
    await createGameRegion(req.gameRegion)
    // Create platform for the game.
    await createGamePlatform(req.gamePlatform)
    // Store uploaded images for the game.
    await storeImages(req.gameRegion)
    // Store links for the game.
    await storeLinks(req.gamePlatform)
    // Link to other games if an ID is given.
    if (id) await getGamePlatform(Platform)
        .then(async res => {
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
    await getGamePlatform(id)
        .then(async res => {
            res.gameRegions.push(Region)
            await GamePlatformModel.findOneAndUpdate({ _id: id }, { gameRegions: res.gameRegions })
        })
    // Store uploaded images for the game.
    await storeImages(req.gameRegion, id)
}

// Create a specific game for a determined platform.
async function createGamePlatform(req) {
    Platform = generateID()
    // Create game platform model.
    const GamePlatform = GamePlatformModel.create({
        _id: Platform,
        gamePlatforms: new Array(Platform),
        gameRegions: new Array(Region),
        developer: req.developer,
        platform: req.platform,
        releaseYear: req.releaseYear,
        numberPlayers: req.numberPlayers,
        latestVersion: req.latestVersion
    })
    // Save model to database.
    await GamePlatform.save()
}

// Create a specific region for a determined game.
async function createGameRegion(req) {
    // Create game region model.
    const GameRegion = GameRegionModel.create({
        _id: generateID(),
        gameVersions: new Array(Version),
        title: req.title,
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
        .then(res => Region = res._id)
}

// Create a specific version for a determined region.
async function createGameVersion(req) {
    // Create game version model.
    const GameVersion = GameVersionModel.create({
        _id: generateID(),
        currentVersion: req.currentVersion,
        comments: req.comments
    })
    // Save model to database.
    await GameVersion.save()
        // Store version id.
        .then(res => Version = res._id)
}

// Update the specified game.
export async function updateGame(req, id) {
    // Update the game platform.
    await GamePlatformModel.findOneAndUpdate({ _id: id.gamePlatform }, {
        developer: req.gamePlatform.developer,
        platform: req.gamePlatform.platform,
        releaseYear: req.gamePlatform.releaseYear,
        numberPlayers: req.gamePlatform.numberPlayers,
        latestVersion: req.gamePlatform.latestVersion
    })
    // Update the game region.
    await GameRegionModel.findOneAndUpdate({ _id: id.gameRegion }, {
        title: req.gameRegion.title,
        subTitle: req.gameRegion.subTitle,
        originalTitle: req.gameRegion.originalTitle,
        romanizedTitle: req.gameRegion.romanizedTitle,
        translatedTitle: req.gameRegion.translatedTitle,
        region: req.gameRegion.region,
        serial: req.gameRegion.serial
    })
    // Update the game version.
    await GameVersionModel.findOneAndUpdate({ _id: id.gameVersion }, {
        currentVersion: req.gameVersion.currentVersion,
        comments: req.gameVersion.comments
    })
    // Update stored images for the game.
    await updateImages(req.gameRegion, id)
    // Update stored links for the game.
    await storeLinks(req.gamePlatform, id.gamePlatform)
}

// Delete the specified game platform and all its related data.
export async function deleteGamePlatform(req, p) {
    // Delete all the game regions of the game platform.
    for (let r of req.gameRegions) {
        // Delete all the game versions of the game region.
        for (let v of r.gameVersions) {
            await GameVersionModel.findOneAndDelete({ _id: p ? v : v._id })
        }
        await GameRegionModel.findOneAndDelete({ _id: r._id })
    }
    // Unlink game.
    await unlinkGame(req, true)
    // Remove game platform's images.
    remove(app.getAppPath() + '/images/' + req._id)
}

// Delete the specified game region and all its related data.
export async function deleteGameRegion(req, i) {
    // Delete all the game versions of the game region.
    for (let v of req.gameRegions[i].gameVersions) {
        await GameVersionModel.findOneAndDelete({ _id: v._id })
    }
    // Delete the game region.
    await GameRegionModel.findOneAndDelete({ _id: req.gameRegions[i]._id })

    if ((req.gameRegions.length - 1) > 0) {
        // Update platform for the game.
        await getGamePlatform(req._id)
            .then(async res => {
                let index = res.gameRegions.indexOf(req.gameRegions[i]._id)
                res.gameRegions.splice(index, 1)
                await GamePlatformModel.findOneAndUpdate({ _id: req._id }, { gameRegions: res.gameRegions })
            })
        // Remove game region's images.
        remove(app.getAppPath() + '/images/' + req._id + '/' + req.gameRegions[i]._id)
        // There are other regions for the platform.
        return true
    }
    else {
        // Unlink game.
        await unlinkGame(req, true)
        // Remove game platform's images.
        remove(app.getAppPath() + '/images/' + req._id)
        // There are no other regions for the platform.
        return false
    }
}

// Delete all the games from the specified developer.
export async function deleteGamesD(req) {
    await GamePlatformModel.find({ developer: req }, { populate: ['gameRegions'] })
        .then(async res => {
            // Delete all the game platforms of the platform.
            for (let p of res) {
                await deleteGamePlatform(p, true)
            }
        })
}

// Delete all the games from the specified platform.
export async function deleteGamesP(req) {
    await GamePlatformModel.find({ platform: req }, { populate: ['gameRegions'] })
        .then(async res => {
            // Delete all the game platforms of the platform.
            for (let p of res) {
                await deleteGamePlatform(p, true)
            }
        })
}

// Store images for a specific game.
async function storeImages(req, id) {
    // Set game platform ID.
    Platform = id ? id : Platform
    // Set image path for a specific game region.
    let imagesPath = app.getAppPath() + '/images/' + Platform + '/' + Region
    // Ensure images directory creation, even if there are no images.
    ensureDirSync(imagesPath)
    // Add cover image file.
    if (req.images.cover.add) {
        // Copy cover image file. It starts with eight zeroes, followed by eight random characters.
        copySync(req.images.cover.add[0], imagesPath + '/' + '0'.repeat(8) + generateID().substr(0, 8))
    }
    // Add pictures image files.
    for (let [i, image] of req.images.pictures.add.entries()) {
        copySync(image, imagesPath + '/' + i.toString(16).toUpperCase().padStart(2, '0') + generateID().substr(0, 14))
    }
}

// Update stored images for a specific game.
async function updateImages(req, id) {
    // Set image path for a specific game region.
    let imagesPath = app.getAppPath() + '/images/' + id.gamePlatform + '/' + id.gameRegion
    // Remove cover image file.
    if (req.images.cover.remove) {
        // The cover image file starts with eight zeroes, followed by eight random characters.
        removeSync(imagesPath + '/' + readdirSync(imagesPath).filter(res => res.startsWith('0'.repeat(8)))[0])
    }
    // Add cover image file.
    if (req.images.cover.add) {
        // Remove any previously stored cover image file.
        removeSync(imagesPath + '/' + readdirSync(imagesPath).filter(res => res.startsWith('0'.repeat(8)))[0])
        // Copy cover image file, using cache busting for proper rendering update.
        copySync(req.images.cover.add[0], imagesPath + '/' + '0'.repeat(8) + generateID().substr(0, 8))
    }
    // Remove pictures image files.
    for (let image of req.images.pictures.remove) {
        removeSync(imagesPath + '/' + image)
    }
    // Add pictures image files.
    let i = readdirSync(imagesPath).filter(res => !res.startsWith('0'.repeat(8))).length + 1
    for (let image of req.images.pictures.add) {
        copySync(image, imagesPath + '/' + i.toString(16).toUpperCase().padStart(2, '0') + generateID().substr(0, 14))
        i++
    }
}

// Store links for a specific game.
async function storeLinks(req, id) {
    // Set game platform ID.
    Platform = id ? id : Platform
    // Create links object.
    let linksFile = ''
    for (let [i, link] of req.links.entries()) {
        // Add link to object.
        linksFile += link + (i != req.links.length - 1 ? '\n' : '')
    }
    // Ensure link icons directory creation.
    ensureDirSync(app.getAppPath() + '/assets/links/')
    // Create links file.
    outputFileSync(app.getAppPath() + '/images/' + Platform + '/links', linksFile)
}

// Manage game linking.
export async function linkGame(req, sid) {
    // Get selected game.
    let sel = await getGamePlatform(sid)
    // Concatenate the current and the selected games' game platforms.
    let linkedGames = req.gamePlatforms.concat(sel.gamePlatforms)
    // Update the game platforms of all the linked games.
    for (let g of linkedGames) {
        await GamePlatformModel.findOneAndUpdate({ _id: g }, { gamePlatforms: linkedGames })
    }
    // Return list to display in UI.
    return linkedGames
}

// Manage game unlinking.
export async function unlinkGame(req, del) {
    // Get only the linked games.
    let linkedGames = req.gamePlatforms.filter(res => res != req._id)
    if (del) {
        // Delete the game platform.
        await GamePlatformModel.findOneAndDelete({ _id: req._id })
    } else {
        // Update the game platform.
        await GamePlatformModel.findOneAndUpdate({ _id: req._id }, { gamePlatforms: new Array(req._id) })
    }
    // Delete the game platform from the linked games.
    for (let g of linkedGames) {
        await GamePlatformModel.findOneAndUpdate({ _id: g }, { gamePlatforms: linkedGames })
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
    gameRegionsSorted = gameRegionsSorted.concat(gameRegions.filter(res => res != gameRegions[index]))
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
        .then(async res => {
            // Loop through all the items in 'res.gameRegions[]'.
            for (let gameRegion of res.gameRegions) {
                await getGameRegion(gameRegion)
                    // Populate each item with its data.
                    .then(res => gameRegions.push(res))
            }
            await getDeveloper(res.developer)
                .then(dev => res.developer = dev)
            await getPlatform(res.platform)
                .then(pla => res.platform = pla)
            res.gameRegions = gameRegions
            // Return populated object.
            return res
        })
}

// Get all games.
export async function getGamesAll(index, count, query) {
    // Configure the search query.
    const search = query ? query : {}
    // Search game regions first to be able to sort elements by title.
    return await GameRegionModel.find(search, { skip: index, limit: count, sort: 'title', populate: false })
        .then(async res => {
            let gamePlatforms = []
            for (let gameRegion of res) {
                // Populate the required game platform data for the region.
                await GamePlatformModel.findOne({ gameRegions: gameRegion._id }, { populate: true })
                    .then(async pla => {
                        // Avoid returning all regions of the game.
                        if (pla.gameRegions[0]._id == gameRegion._id) {
                            pla.gameRegions[0] = gameRegion
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
    const querySearch = { $or: [{ title: search }, { subTitle: search }, { translatedTitle: search }] }
    // Get all game regions for the selected platform.
    return await getGamesAll(index, count, querySearch)
}

// Get all games by a specific developer.
export async function getGamesDeveloper(req, index, count, query) {
    let gameRegions = []
    // Search all game platforms for the selected developer.
    return await GamePlatformModel.find({ developer: req }, { populate: false, select: ['gameRegions'] })
        .then(async res => {
            for (let gamePlatform of res) {
                // Store default region for the sorted search.
                gameRegions.push(gamePlatform.gameRegions[0])
            }
            // Configure the search parameters.
            const search = new RegExp(query, 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { subTitle: search }, { translatedTitle: search }] }
            // Get all game regions for the selected platform.
            return await getGamesAll(index, count, querySearch)
        })
}

// Get all games by a specific platform.
export async function getGamesPlatform(req, index, count, query) {
    let gameRegions = []
    // Search all game platforms for the selected platform.
    return await GamePlatformModel.find({ platform: req }, { populate: false, select: ['gameRegions'] })
        .then(async res => {
            for (let gamePlatform of res) {
                // Store default region for the sorted search.
                gameRegions.push(gamePlatform.gameRegions[0])
            }
            // Configure the search parameters.
            const search = new RegExp(query, 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { subTitle: search }, { translatedTitle: search }] }
            // Get all game regions for the selected platform.
            return await getGamesAll(index, count, querySearch)
        })
}

// Get all games matching a given search query.
export async function getGamesSearch(index, count, query) {
    // Configure the search parameters.
    const search = {
        title: new RegExp(query.title, 'i'),
        platform: new RegExp(query.platform, 'i'),
        developer: new RegExp(query.developer, 'i'),
        releaseYear: new RegExp(query.releaseYear, 'i')
    }
    let platforms = []
    // Get all platforms matching the given query.
    await getPlatformByName(search.platform)
        .then(async res => {
            for (let platform of res) {
                // Store the platform IDs.
                platforms.push(platform._id)
            }
        })
    let developers = []
    // Get all developers matching the given query.
    await getDeveloperByName(search.developer)
        .then(async res => {
            for (let developer of res) {
                // Store the developer IDs.
                developers.push(developer._id)
            }
        })
    let gameRegions = []
    // Search all game platforms matching the selected developer and platform.
    await GamePlatformModel.find({ $and: [{ platform: { $in: platforms }, developer: { $in: developers }, releaseYear: search.releaseYear }] }, { populate: false, select: ['gameRegions'] })
        .then(async res => {
            for (let gamePlatform of res) {
                // Store default region for the sorted search.
                gameRegions.push(gamePlatform.gameRegions[0])
            }
        })
    // Configure the search query.
    const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search.title }, { subTitle: search.title }, { translatedTitle: search.title }] }
    // Get all the game regions matching the search query.
    return await getGamesAll(index, count, querySearch)
}

// Get all linked games of a specific game platform.
export async function getGamesLinked(req) {
    return await GamePlatformModel.find({ _id: { $in: req } }, { populate: true })
}

// Get all linked games matching a given search query.
export async function getGamesLinkedSearch(req, query) {
    // Configure the search parameters.
    const search = new RegExp(query, 'i')
    // Configure the search query.
    const querySearch = { $or: [{ title: search }, { subTitle: search }, { translatedTitle: search }] }
    // Search through game regions, case insensitive.
    return await GameRegionModel.find(querySearch)
        .then(async res => {
            let idBlacklist = []
            let gamePlatforms = []
            let platforms = []
            for (let gameRegion of res) {
                // Search the parent game platform of the game region.
                await GamePlatformModel.findOne({ gameRegions: gameRegion._id }, { populate: ['developer', 'platform'] })
                    .then(async res => {
                        // Avoid returning already linked games.
                        if (!req.includes(res._id)) {
                            // Avoid returning all regions of a game.
                            if (!idBlacklist.includes(res._id)) {
                                // Populate parent with the region.
                                res.child = gameRegion
                                // Get linked games' platforms names.
                                for (let gamePlatform of res.gamePlatforms) {
                                    await GamePlatformModel.findOne({ _id: gamePlatform }, { select: ['platform'], populate: ['platform'] })
                                        .then(res => platforms.push(res.platform.name))
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

// Get cover image for a specific game.
export function getImage(req) {
    // Set the image directory path of the game region.
    let imagePath = app.getAppPath() + '/images/' + req._id + '/' + req.gameRegions[0]._id
    // Load images filenames and filter the cover image file.
    let imageFile = readdirSync(imagePath).filter(res => res.startsWith('0'.repeat(8)))[0]
    // Load first picture image as cover if it doesn't exists.
    if (!imageFile) {
        imageFile = readdirSync(imagePath).filter(res => !res.startsWith('0'.repeat(8)))[0]
    }
    // Return the cover if it exists.
    return imageFile ? (imagePath + '/' + imageFile) : false
}

// Get the name for the requested region code.
export function getRegion(reg) {
    // Filter code from array.
    let region = Regions.filter(res => res.code == reg)
    // Return the name property.
    return region.length > 0 ? region[0].name : reg
}