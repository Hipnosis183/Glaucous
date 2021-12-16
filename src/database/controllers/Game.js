import GamePlatformModel from '@/database/models/GamePlatform'
import GameRegionModel from '@/database/models/GameRegion'
import GameVersionModel from '@/database/models/GameVersion'
import { generateID } from '@/database/datastore'
import { getDevelopers, getDeveloperByName } from './Developer'
import { getPlatform, getPlatformAllByName, getPlatformsGroup } from './Platform'
import { getFavorites, getPlaylist, getRecent, getTags, removeGameUser } from './User'

import path from 'path'
import store from '@/store'
import { copySync, ensureDirSync, existsSync, moveSync, outputJsonSync, readdirSync, readJsonSync, remove, removeSync } from 'fs-extra'
import { readfiles } from '@/utils/filesystem'
import { normalize } from '@/utils/normalize'

import Regions from '@/../public/files/flags/flags.json'

// Declare game variables.
let gamePlatform
let gameRegion
let gameVersion

// Declare paths variables.
let dataPathConfig = store.getters.getAppPath + '/data/config/'
let dataPathFiles = store.getters.getAppPath + '/data/files/'
let dataPathImages = store.getters.getAppPath + '/data/images/'
let dataPathLinks = store.getters.getAppPath + '/data/links/'

// Create a new game platform.
export async function newGamePlatform(req, id) {
    let platformId = req.id ? req.id : generateID()
    let regionId = req.gameRegion.region ? req.gameRegion.region : '00'
    // Create a version for the game.
    await createGameVersion(req.gameVersion, (platformId + '-' + regionId + '-00').toUpperCase())
    // Create a region for the game.
    await createGameRegion(req.gameRegion, (platformId + '-' + regionId).toUpperCase())
    // Create platform for the game.
    await createGamePlatform(req.gamePlatform, platformId.toUpperCase())
    // Set game storage path.
    let storePath = req.gamePlatform.platform + '/' + gamePlatform
    // Store uploaded images for the game.
    await storeImages(req.gamePlatform.images, storePath)
    await storeImages(req.gameRegion.images, storePath + '/' + gameRegion)
    await storeImages(req.gameVersion.images, storePath + '/' + gameRegion + '/' + gameVersion)
    // Store links for the game.
    await storeLinks(req.gamePlatform.links, storePath, gamePlatform)
    await storeLinks(req.gameRegion.links, storePath + '/' + gameRegion, gameRegion)
    await storeLinks(req.gameVersion.links, storePath + '/' + gameRegion + '/' + gameVersion, gameVersion)
    // Store files for the game.
    await storeFiles(req.gamePlatform.files, storePath)
    await storeFiles(req.gameRegion.files, storePath + '/' + gameRegion)
    await storeFiles(req.gameVersion.files, storePath + '/' + gameRegion + '/' + gameVersion)
    // Link to other games if an ID is given.
    if (id) await getGamePlatform(gamePlatform)
        .then(async (res) => {
            await linkGame(res, id)
        })
}

// Create a new game region.
export async function newGameRegion(req, id) {
    // Resolve the game region ID to use.
    let regionId = req.gameRegion.region ? req.gameRegion.region
        : await GamePlatformModel.findOne({ _id: id.gamePlatform }, { populate: false })
            .then(async (res) => {
                // Get the region codes from the IDs of the parent game platform.
                let regionCodes = res.gameRegions.map((r) => parseInt(r.slice(-2), 10))
                // Filter non-numeric region code values.
                regionCodes = regionCodes.filter((r) => r >= 0)
                return regionCodes.length > 0
                    ? (Math.max(...regionCodes) + 1).toString().padStart(2, '0') : '00'
            })
    // Create a version for the game.
    await createGameVersion(req.gameVersion, (id.gamePlatform + '-' + regionId + '-00').toUpperCase())
    // Create a region for the game.
    await createGameRegion(req.gameRegion, (id.gamePlatform + '-' + regionId).toUpperCase())
    // Update platform for the game.
    await getGamePlatform(id.gamePlatform)
        .then(async (res) => {
            res.gameRegions.push(gameRegion)
            await GamePlatformModel.findOneAndUpdate({ _id: id.gamePlatform }, { gameRegions: res.gameRegions })
            // Set game storage path.
            let storePath = res.platform + '/' + id.gamePlatform + '/' + gameRegion
            // Store uploaded images for the game.
            await storeImages(req.gameRegion.images, storePath)
            await storeImages(req.gameVersion.images, storePath + '/' + gameVersion)
            // Store links for the game.
            await storeLinks(req.gameRegion.links, storePath, gameRegion)
            await storeLinks(req.gameVersion.links, storePath + '/' + gameVersion, gameVersion)
            // Store files for the game.
            await storeFiles(req.gameRegion.files, storePath)
            await storeFiles(req.gameVersion.files, storePath + '/' + gameVersion)
        })
}

// Create a new game version.
export async function newGameVersion(req, pla, id) {
    // Resolve the game version ID to use.
    let versionId = await GameRegionModel.findOne({ _id: id.gameRegion }, { populate: false })
        .then(async (res) => {
            // Get the version index from the IDs of the parent game region.
            let versionIndex = res.gameVersions.map((v) => parseInt(v.slice(-2), 10))
            return (Math.max(...versionIndex) + 1).toString().padStart(2, '0')
        })
    // Create a version for the game.
    await createGameVersion(req.gameVersion, (id.gameRegion + '-' + versionId).toUpperCase())
    // Update region for the game.
    await GameRegionModel.findOne({ _id: id.gameRegion }, { populate: false })
        .then(async (res) => {
            res.gameVersions.push(gameVersion)
            await GameRegionModel.findOneAndUpdate({ _id: id.gameRegion }, { gameVersions: res.gameVersions })
            // Set game storage path.
            let storePath = pla + '/' + id.gamePlatform + '/' + id.gameRegion + '/' + gameVersion
            // Store uploaded images for the game.
            await storeImages(req.gameVersion.images, storePath)
            // Store links for the game.
            await storeLinks(req.gameVersion.links, storePath, gameVersion)
            // Store files for the game.
            await storeFiles(req.gameVersion.files, storePath)
        })
}

// Create a specific game for a determined platform.
async function createGamePlatform(req, id) {
    // Create game platform model.
    const GamePlatform = GamePlatformModel.create({
        _id: id,
        gamePlatforms: new Array(id),
        gameRegions: new Array(gameRegion),
        platform: req.platform,
        developers: req.developers,
        publishers: req.publishers,
        releaseYear: req.releaseYear ? req.releaseYear : '',
        numberPlayers: req.numberPlayers ? req.numberPlayers : '',
        gameTags: req.gameTags,
        notes: req.notes
    })
    // Save model to database.
    await GamePlatform.save()
        // Store platform id.
        .then((res) => gamePlatform = res._id)
}

// Create a specific region for a determined game.
async function createGameRegion(req, id) {
    // Create game region model.
    const GameRegion = GameRegionModel.create({
        _id: id,
        gameVersions: new Array(gameVersion),
        title: req.title,
        preTitle: req.preTitle,
        subTitle: req.subTitle,
        originalTitle: req.originalTitle,
        romanizedTitle: req.romanizedTitle,
        translatedTitle: req.translatedTitle,
        region: req.region,
        serial: req.serial,
        notes: req.notes
    })
    // Save model to database.
    await GameRegion.save()
        // Store region id.
        .then((res) => gameRegion = res._id)
}

// Create a specific version for a determined region.
async function createGameVersion(req, id) {
    // Create game version model.
    const GameVersion = GameVersionModel.create({
        _id: id,
        type: req.type,
        name: req.name,
        number: req.number,
        notes: req.notes
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
        platform: req.gamePlatform.platform,
        developers: req.gamePlatform.developers,
        publishers: req.gamePlatform.publishers,
        releaseYear: req.gamePlatform.releaseYear,
        numberPlayers: req.gamePlatform.numberPlayers,
        gameTags: req.gamePlatform.gameTags,
        notes: req.gamePlatform.notes
    })
    // Update the game region.
    await GameRegionModel.findOneAndUpdate({ _id: id.gameRegion }, {
        title: req.gameRegion.title,
        preTitle: req.gameRegion.preTitle,
        subTitle: req.gameRegion.subTitle,
        originalTitle: req.gameRegion.originalTitle,
        romanizedTitle: req.gameRegion.romanizedTitle,
        translatedTitle: req.gameRegion.translatedTitle,
        serial: req.gameRegion.serial,
        notes: req.gameRegion.notes
    })
    // Update the game version.
    await GameVersionModel.findOneAndUpdate({ _id: id.gameVersion }, {
        type: req.gameVersion.type,
        name: req.gameVersion.name,
        number: req.gameVersion.number,
        notes: req.gameVersion.notes
    })
    // Set game storage path.
    let storePath = old.platform + '/' + id.gamePlatform
    // Update stored images for the game.
    await updateImages(req.gamePlatform.images, storePath)
    await updateImages(req.gameRegion.images, storePath + '/' + id.gameRegion)
    await updateImages(req.gameVersion.images, storePath + '/' + id.gameRegion + '/' + id.gameVersion)
    // Update stored links for the game.
    await storeLinks(req.gamePlatform.links, storePath, id.gamePlatform)
    await storeLinks(req.gameRegion.links, storePath + '/' + id.gameRegion, id.gameRegion)
    await storeLinks(req.gameVersion.links, storePath + '/' + id.gameRegion + '/' + id.gameVersion, id.gameVersion)
    // Update stored files for the game.
    await storeFiles(req.gamePlatform.files, storePath)
    await storeFiles(req.gameRegion.files, storePath + '/' + id.gameRegion)
    await storeFiles(req.gameVersion.files, storePath + '/' + id.gameRegion + '/' + id.gameVersion)
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
    remove(dataPathConfig + req.platform._id + '/' + req._id)
    remove(dataPathFiles + req.platform._id + '/' + req._id)
    remove(dataPathImages + req.platform._id + '/' + req._id)
    remove(dataPathLinks + req.platform._id + '/' + req._id)
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
        remove(dataPathConfig + req.platform._id + '/' + req._id + '/' + req.gameRegions[i]._id)
        remove(dataPathFiles + req.platform._id + '/' + req._id + '/' + req.gameRegions[i]._id)
        remove(dataPathImages + req.platform._id + '/' + req._id + '/' + req.gameRegions[i]._id)
        remove(dataPathLinks + req.platform._id + '/' + req._id + '/' + req.gameRegions[i]._id)
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
        remove(dataPathConfig + req.platform._id + '/' + req._id + '/' + req.gameRegions[r]._id + '/' + req.gameRegions[r].gameVersions[v]._id)
        remove(dataPathFiles + req.platform._id + '/' + req._id + '/' + req.gameRegions[r]._id + '/' + req.gameRegions[r].gameVersions[v]._id)
        remove(dataPathImages + req.platform._id + '/' + req._id + '/' + req.gameRegions[r]._id + '/' + req.gameRegions[r].gameVersions[v]._id)
        remove(dataPathLinks + req.platform._id + '/' + req._id + '/' + req.gameRegions[r]._id + '/' + req.gameRegions[r].gameVersions[v]._id)
        // There are other versions for the region.
        return true
    }
    else {
        // Delete game region.
        return await deleteGameRegion(req, r, true)
    }
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
            remove(dataPathConfig + req)
            remove(dataPathFiles + req)
            remove(dataPathImages + req)
            remove(dataPathLinks + req)
        })
}

// Delete a specific developer from all of the games in which is included.
export async function deleteGamesDeveloper(req) {
    await GamePlatformModel.find({ developers: req }, { populate: false })
        .then(async (res) => {
            // Update all the game platforms that includes the developer.
            for (let gamePlatform of res) {
                // Filter developer from the game developers array.
                let developers = gamePlatform.developers.filter((res) => res != req)
                await GamePlatformModel.findOneAndUpdate({ _id: gamePlatform._id }, { developers: developers })
            }
        })
    await GamePlatformModel.find({ publishers: req }, { populate: false })
        .then(async (res) => {
            // Update all the game platforms that includes the publisher.
            for (let gamePlatform of res) {
                // Filter publisher from the game publishers array.
                let publishers = gamePlatform.publishers.filter((res) => res != req)
                await GamePlatformModel.findOneAndUpdate({ _id: gamePlatform._id }, { publishers: publishers })
            }
        })
}

// Delete a specific tag from all of the games in which is included.
export async function deleteGamesTag(req) {
    await GamePlatformModel.find({ gameTags: req }, { populate: false })
        .then(async (res) => {
            // Update all the game platforms that includes the tag.
            for (let gamePlatform of res) {
                // Filter tag from the game tags array.
                let gameTags = gamePlatform.gameTags.filter((res) => res != req)
                await GamePlatformModel.findOneAndUpdate({ _id: gamePlatform._id }, { gameTags: gameTags })
            }
        })
}

// Store images for a specific game.
async function storeImages(images, path) {
    // Set image path for a specific game.
    let imagesPath = dataPathImages + path
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
    let imagesPath = dataPathImages + path
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
    let i = readfiles(imagesPath).filter((res) => !res.startsWith('0'.repeat(8))).length + 1
    for (let image of images.pictures.add) {
        copySync(image, imagesPath + '/' + i.toString(16).toUpperCase().padStart(2, '0') + generateID().substr(0, 14))
        i++
    }
}

// Store links for a specific game.
async function storeLinks(links, path, id) {
    // Create links object.
    let linksFile = []
    for (let link of links) {
        let linkFile = {}
        // Avoid writting the name prop if it's null.
        if (link.name) { linkFile.name = link.name }
        linkFile.url = link.url
        // Add link to object.
        linksFile.push(linkFile)
    }
    if (links.length > 0) {
        // Ensure link icons directory creation.
        ensureDirSync(dataPathLinks)
        // Create links file.
        outputJsonSync(dataPathLinks + path + '/' + id + '.json', linksFile)
    }
}

// Store files for a specific game.
async function storeFiles(files, dir) {
    // Set files path for the game.
    let filesPath = dataPathFiles + dir
    // Ensure files directory creation, even if there are no files.
    ensureDirSync(filesPath)
    // Add files.
    for (let file of files.add) {
        let id = generateID()
        // Define data object structure.
        let filesFile = { id: id, name: file.name, paths: [] }
        for (let f of file.paths) {
            // Copy files to game files path.
            copySync(f, filesPath + '/' + id + '/' + path.basename(f))
            // Add files to the files data object.
            filesFile.paths.push(id + '/' + path.basename(f))
        }
        outputJsonSync(filesPath + '/' + id + '.json', filesFile)
    }
    // Remove files.
    for (let file of files.remove) {
        removeSync(filesPath + '/' + file)
        removeSync(filesPath + '/' + file + '.json')
    }
}

// Move the game directory if the platform has changed.
async function updateStore(platform, old, game) {
    if (platform != old) {
        let pathOld = old + '/' + game
        let pathNew = platform + '/' + game
        moveSync(dataPathConfig + pathOld, dataPathConfig + pathNew, { overwrite: true })
        moveSync(dataPathFiles + pathOld, dataPathFiles + pathNew, { overwrite: true })
        moveSync(dataPathImages + pathOld, dataPathImages + pathNew, { overwrite: true })
        moveSync(dataPathLinks + pathOld, dataPathLinks + pathNew, { overwrite: true })
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

// Reorder a game versions array to select one as the default.
export async function selectGameVersion(req, index) {
    let gameVersions = []
    // Get all game regions IDs.
    for (let gameVersion of req.gameVersions) {
        gameVersions.push(gameVersion._id)
    }
    // Create new sorted array.
    let gameVersionsSorted = new Array(gameVersions[index])
    gameVersionsSorted = gameVersionsSorted.concat(gameVersions.filter((res) => res != gameVersions[index]))
    // Update the game region.
    await GameRegionModel.findOneAndUpdate({ _id: req._id }, { gameVersions: gameVersionsSorted })
}

// Get a specific game platform.
export async function getGamePlatform(req) {
    return await GamePlatformModel.findOne({ _id: req }, { populate: false })
}

// Get the count of game platforms belonging to a specific platform.
export async function getGamePlatformCountP(req) {
    return await GamePlatformModel.count({ platform: req }, { populate: false })
}

// Get the count of game platforms belonging to a specific developer.
export async function getGamePlatformCountD(req) {
    return await GamePlatformModel.count({ developers: req }, { populate: false })
}

// Get the count of game platforms containing a specific tag.
export async function getGamePlatformCountT(req) {
    return await GamePlatformModel.count({ gameTags: req }, { populate: false })
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
            await getPlatform(res.platform)
                .then((pla) => res.platform = pla)
            await getDevelopers(res.developers)
                .then((dev) => res.developers = dev)
            await getDevelopers(res.publishers)
                .then((dev) => res.publishers = dev)
            await getTags(res.gameTags)
                .then((tag) => res.gameTags = tag)
            res.gameRegions = gameRegions
            res = await getFiles(res)
            res = await getLinks(res)
            // Return populated object.
            return res
        })
}

// Global games list, to keep consistency with paginated queries.
let gamePlatformsId = []
// Get all games.
export async function getGamesAll(index, count, query, sort) {
    // Configure the search query.
    const search = query ? query : {}
    const sorting = sort ? 'title' : ''
    // Clear previous games list when querying for a different list.
    if (index == 0) { gamePlatformsId = [] }
    // Search game regions first to be able to sort elements by title.
    return await GameRegionModel.find(search, { skip: index, limit: count, sort: sorting, populate: false })
        .then(async (res) => {
            let gamePlatforms = []
            for (let gameRegion of res) {
                // Populate the required game platform data for the region.
                await GamePlatformModel.findOne({ gameRegions: gameRegion._id }, { populate: true })
                    .then((pla) => {
                        if (!gamePlatformsId.includes(pla._id)) {
                            pla.image = getImage(pla)
                            gamePlatforms.push(pla)
                            gamePlatformsId.push(pla._id)
                        }
                    })
            }
            return gamePlatforms
        })
}

// Get all games matching a given search query.
export async function getGamesAllSearch(index, count, query) {
    // Configure the search parameters.
    const search = new RegExp(normalize(query), 'i')
    // Configure the search query.
    const querySearch = { $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { originalTitle: search }, { translatedTitle: search }] }
    // Get all game regions for the selected platform.
    return await getGamesAll(index, count, querySearch, true)
}

// Get all games by a specific platform.
export async function getGamesPlatform(req, index, count, query) {
    let gameRegions = []
    // Search all game platforms for the selected platform.
    return await GamePlatformModel.find({ platform: req }, { populate: false, select: ['gameRegions'] })
        .then(async (res) => {
            for (let gamePlatform of res) {
                for (let gameRegion of gamePlatform.gameRegions) {
                    // Store game regions for the sorted search.
                    gameRegions.push(gameRegion)
                }
            }
            // Configure the search parameters.
            const search = new RegExp(normalize(query), 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { originalTitle: search }, { translatedTitle: search }] }
            // Get all game regions for the selected platform.
            return await getGamesAll(index, count, querySearch, true)
        })
}

// Get all games by a specific developer.
export async function getGamesDeveloper(req, index, count, query) {
    let gameRegions = []
    // Search all game platforms for the selected developer.
    return await GamePlatformModel.find({ $or: [{ developers: req }, { publishers: req }] }, { populate: false, select: ['gameRegions'] })
        .then(async (res) => {
            for (let gamePlatform of res) {
                for (let gameRegion of gamePlatform.gameRegions) {
                    // Store game regions for the sorted search.
                    gameRegions.push(gameRegion)
                }
            }
            // Configure the search parameters.
            const search = new RegExp(normalize(query), 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { originalTitle: search }, { translatedTitle: search }] }
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
                for (let gameRegion of gamePlatform.gameRegions) {
                    // Store game regions for the sorted search.
                    gameRegions.push(gameRegion)
                }
            }
            // Configure the search parameters.
            const search = new RegExp(normalize(query), 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { originalTitle: search }, { translatedTitle: search }] }
            // Get all game regions for the selected platform.
            return await getGamesAll(index, count, querySearch, true)
        })
}

let platforms = []

// Get all games matching a given search query.
export async function getGamesSearch(index, count, query) {
    // Configure the search parameters.
    const search = {
        title: new RegExp(normalize(query.title), 'i'),
        platform: new RegExp(normalize(query.platform), 'i'),
        developers: new RegExp(normalize(query.developers), 'i'),
        releaseYear: new RegExp(normalize(query.releaseYear), 'i')
    }
    platforms = []
    // Get all platforms matching the given query.
    await getPlatformAllByName(query.platform)
        .then(async (res) => {
            await getGamesSearchPlatform(res)
        })
    let developers = []
    // Get all developers matching the given query.
    await getDeveloperByName(query.developers)
        .then((res) => {
            for (let developer of res) {
                // Store the developer IDs.
                developers.push(developer._id)
            }
        })
    let gameRegions = []
    // Search all game platforms matching the selected developer and platform.
    await GamePlatformModel.find({ $and: [{ platform: { $in: platforms }, $or: [{ developers: { $in: developers } }, { publishers: { $in: developers } }], releaseYear: search.releaseYear }] }, { populate: false, select: ['gameRegions'] })
        .then((res) => {
            for (let gamePlatform of res) {
                for (let gameRegion of gamePlatform.gameRegions) {
                    // Store game regions for the sorted search.
                    gameRegions.push(gameRegion)
                }
            }
        })
    // Configure the search query.
    const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search.title }, { preTitle: search.title }, { subTitle: search.title }, { originalTitle: search }, { translatedTitle: search.title }] }
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
    return await GamePlatformModel.find({ _id: { $in: req } }, { populate: ['gameRegions', 'platform'] })
        .then((res) => {
            let gamePlatforms = []
            for (let gameLinked of res) {
                // Get game configuration.
                gameLinked.image = getImage(gameLinked)
                gamePlatforms.push(gameLinked)
            }
            return gamePlatforms.sort((a, b) => {
                // Compare function that returns natural ordered elements.
                return a.gameRegions[0].title.localeCompare(b.gameRegions[0].title, navigator.language, { numeric: true, ignorePunctuation: true })
            })
        })
}

// Get all linked games matching a given search query.
export async function getGamesLinkedSearch(req, query) {
    // Configure the search parameters.
    const search = new RegExp(normalize(query), 'i')
    // Configure the search query.
    const querySearch = { $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { originalTitle: search }, { translatedTitle: search }] }
    // Search through game regions, case insensitive.
    return await GameRegionModel.find(querySearch, { sort: 'title' })
        .then(async (res) => {
            let idBlacklist = []
            let gamePlatforms = []
            let platforms = []
            for (let gameRegion of res) {
                // Search the parent game platform of the game region.
                await GamePlatformModel.findOne({ gameRegions: gameRegion._id }, { populate: ['platform'] })
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
                for (let gameRegion of gamePlatform.gameRegions) {
                    // Store game regions for the sorted search.
                    gameRegions.push(gameRegion)
                }
            }
            // Configure the search parameters.
            const search = new RegExp(normalize(query), 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { originalTitle: search }, { translatedTitle: search }] }
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
                for (let gameRegion of gamePlatform.gameRegions) {
                    // Store game regions for the sorted search.
                    gameRegions.push(gameRegion)
                }
            }
            // Configure the search parameters.
            const search = new RegExp(normalize(query), 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { originalTitle: search }, { translatedTitle: search }] }
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
                for (let gameRegion of gamePlatform.gameRegions) {
                    // Store game regions for the sorted search.
                    gameRegions.push(gameRegion)
                }
            }
            // Configure the search parameters.
            const search = new RegExp(normalize(query), 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { originalTitle: search }, { translatedTitle: search }] }
            // Get all playlist games.
            return await getGamesAll(index, count, querySearch, true)
        })
}

// Get all games by a specific tag.
export async function getGamesTag(req, index, count, query) {
    let gameRegions = []
    // Search all game platforms including the tag.
    return await GamePlatformModel.find({ gameTags: req }, { populate: false, select: ['gameRegions'] })
        .then(async (res) => {
            for (let gamePlatform of res) {
                for (let gameRegion of gamePlatform.gameRegions) {
                    // Store game regions for the sorted search.
                    gameRegions.push(gameRegion)
                }
            }
            // Configure the search parameters.
            const search = new RegExp(normalize(query), 'i')
            // Configure the search query.
            const querySearch = { _id: { $in: gameRegions }, $or: [{ title: search }, { preTitle: search }, { subTitle: search }, { originalTitle: search }, { translatedTitle: search }] }
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
    let gamePath = dataPathImages + game.platform._id + '/' + game._id
    let imagePath = gamePath + '/' + game.gameRegions[0]._id + '/' + gameVer
    ensureDirSync(imagePath)
    // Check if there are images for the selected game version.
    if (!readfiles(imagePath).length > 0) {
        imagePath = gamePath + '/' + game.gameRegions[0]._id
        ensureDirSync(imagePath)
        // Check if there are images for the selected game region.
        if (!readfiles(imagePath).length > 0) {
            imagePath = gamePath
            ensureDirSync(imagePath)
        }
    }
    // Load images filenames and filter the cover image file.
    let imageFile = readdirSync(imagePath).filter((res) => res.startsWith('0'.repeat(8)))[0]
    // Load first picture image as cover if it doesn't exists.
    if (!imageFile) {
        imageFile = readfiles(imagePath).filter((res) => !res.startsWith('0'.repeat(8)))[0]
        image.cover = false
    }
    // Set full image cover path.
    image.path = imageFile ? (imagePath + '/' + imageFile) : false
    return image
}

// Get files for a specific game.
async function getFiles(game) {
    // Set platform files path for the game.
    let pathPlatform = dataPathFiles + game.platform._id + '/' + game._id
    if (existsSync(pathPlatform)) {
        let filesPlatform = []
        // Load files paths for each collection.
        for (let file of readfiles(pathPlatform)) {
            filesPlatform.push(readJsonSync(pathPlatform + '/' + file))
        }
        // Store files into the game platform object.
        game.files = filesPlatform
    } else { game.files = [] }
    // Manage game regions files.
    for (let [i, gameRegion] of game.gameRegions.entries()) {
        // Set region files path for the game.
        let pathRegion = pathPlatform + '/' + gameRegion._id
        if (existsSync(pathRegion)) {
            let filesRegion = []
            // Load files paths for each collection.
            for (let file of readfiles(pathRegion)) {
                filesRegion.push(readJsonSync(pathRegion + '/' + file))
            }
            // Store files into the game region object.
            game.gameRegions[i].files = filesRegion
        } else { game.gameRegions[i].files = [] }
        // Manage game versions files.
        for (let [j, gameVersion] of gameRegion.gameVersions.entries()) {
            // Set version files path for the game.
            let pathVersion = pathRegion + '/' + gameVersion._id
            if (existsSync(pathVersion)) {
                let filesVersion = []
                // Load files paths for each collection.
                for (let file of readfiles(pathVersion)) {
                    filesVersion.push(readJsonSync(pathVersion + '/' + file))
                }
                // Store files into the game version object.
                game.gameRegions[i].gameVersions[j].files = filesVersion
            } else { game.gameRegions[i].gameVersions[j].files = [] }
        }
    } return game
}

// Get links for a specific game.
async function getLinks(game) {
    // Set platform links path for the game.
    let pathPlatform = dataPathLinks + game.platform._id + '/' + game._id
    let filePlatform = pathPlatform + '/' + game._id + '.json'
    // Store links into the game platform object.
    game.links = existsSync(filePlatform) ? readJsonSync(filePlatform) : []
    // Manage game regions links.
    for (let [i, gameRegion] of game.gameRegions.entries()) {
        // Set region links path for the game.
        let pathRegion = pathPlatform + '/' + gameRegion._id
        let fileRegion = pathRegion + '/' + gameRegion._id + '.json'
        // Store links into the game region object.
        game.gameRegions[i].links = existsSync(fileRegion) ? readJsonSync(fileRegion) : []
        // Manage game versions links.
        for (let [j, gameVersion] of gameRegion.gameVersions.entries()) {
            // Set version links path for the game.
            let pathVersion = pathRegion + '/' + gameVersion._id
            let fileVersion = pathVersion + '/' + gameVersion._id + '.json'
            // Store links into the game version object.
            game.gameRegions[i].gameVersions[j].links = existsSync(fileVersion) ? readJsonSync(fileVersion) : []
        }
    } return game
}

// Get the name for the requested region code.
function getRegion(reg) {
    // Filter code from array.
    let region = Regions.filter((res) => res.code == reg)
    // Return the name property.
    return region.length > 0 ? region[0].name : 'Unknown'
}