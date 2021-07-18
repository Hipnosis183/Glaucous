import GamePlatformModel from '../models/GamePlatform'
import GameRegionModel from '../models/GameRegion'
import GameVersionModel from '../models/GameVersion'
import { generateID } from '../datastore'
import { getDeveloper } from './Developer'
import { getPlatform } from './Platform'

import { app } from '@electron/remote'
import {
    copySync,
    ensureDirSync,
    readdirSync,
    removeSync
} from 'fs-extra'

import Regions from '../../../public/files/flags.json'

let Platform
let Region
let Version

export async function newGamePlatform(req) {
    // Create a version for the game.
    await createGameVersion(req.gameVersion)
    // Create a region for the game.
    await createGameRegion(req.gameRegion)
    // Create platform for the game.
    await createGamePlatform(req.gamePlatform)
    // Store uploaded images for the game.
    await storeImages(req.gameRegion)
}

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
        region: req.region
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
    for (let image of req.images.pictures.add) {
        copySync(image, imagesPath + '/' + generateID())
    }
}

export async function updateGame(req, id) {
    // Update the game platform.
    await GamePlatformModel.findOneAndUpdate({ _id: id.gamePlatform }, {
        developer: req.gamePlatform.developer,
        platform: req.gamePlatform.platform,
        releaseYear: req.gamePlatform.releaseYear,
        numberPlayers: req.gamePlatform.numberPlayers,
        latestVersion: req.gamePlatform.latestVersion }
    )
    // Update the game region.
    await GameRegionModel.findOneAndUpdate({ _id: id.gameRegion }, {
        title: req.gameRegion.title,
        subTitle: req.gameRegion.subTitle,
        originalTitle: req.gameRegion.originalTitle,
        romanizedTitle: req.gameRegion.romanizedTitle,
        translatedTitle: req.gameRegion.translatedTitle,
        region: req.gameRegion.region }
    )
    // Update the game version.
    await GameVersionModel.findOneAndUpdate({ _id: id.gameVersion }, {
        currentVersion: req.gameVersion.currentVersion,
        comments: req.gameVersion.comments }
    )
    await updateImages(req.gameRegion, id)
}

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
    for (let image of req.images.pictures.add) {
        copySync(image, imagesPath + '/' + generateID())
    }
}

// Search for a specific game platform.
export async function getGamePlatform(req) {
    return await GamePlatformModel.findOne({ _id: req }, { populate: false })
}

// Search for a specific game platform.
export async function getGamePlatformCountD(req) {
    return await GamePlatformModel.count({ developer: req }, { populate: false })
}

// Search for a specific game platform.
export async function getGamePlatformCountP(req) {
    return await GamePlatformModel.count({ platform: req }, { populate: false })
}

// Search for a specific game region.
export async function getGameRegion(req) {
    return await GameRegionModel.findOne({ _id: req }, { populate: true })
}

// Search for a specific game version.
export async function getGameVersion(req) {
    return await GameVersionModel.findOne({ _id: req }, { populate: false })
}

// Search for a specific game.
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

// Search for all games on an array.
export async function getGames(req) {
    let games = []
    for (let g of req) {
        await getGame(g).then(res => games.push(res))
    }
    return games
}

// Search for all games by a specific developer.
export async function getGamesD(req) {
    let gamePlatforms = []
    return await GamePlatformModel.find({ developer: req }, { populate: false })
        .then(async res => {
            // Loop through all the items in 'res'.
            for (let gamePlatform of res) {
                await getGame(gamePlatform._id)
                    // Populate each item with its data.
                    .then(res => gamePlatforms.push(res))
            }
            res = gamePlatforms
            // Return populated object.
            return res
        })
}

// Search for all games by a specific platform.
export async function getGamesP(req) {
    let gamePlatforms = []
    return await GamePlatformModel.find({ platform: req }, { populate: false })
        .then(async res => {
            // Loop through all the items in 'res'.
            for (let gamePlatform of res) {
                await getGame(gamePlatform._id)
                    // Populate each item with its data.
                    .then(res => gamePlatforms.push(res))
            }
            res = gamePlatforms
            // Return populated object.
            return res
        })
}

// Get the name for the requested region code.
export function getRegion(reg) {
    // Filter code from array.
    let region = Regions.filter(res => res.code == reg)
    // Return the name property.
    return region.length > 0 ? region[0].name : reg
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
        return true
    } else {
        // Unlink game.
        await unlinkGame(req, true)
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

// Search all the games in the database by a given title.
export async function searchGameByTitle(q, req) {
    let query = new RegExp(q, 'i')
    // Search through game regions, case insensitive.
    return await GameRegionModel.find({ $or: [{ title: query }, { subTitle: query }, { translatedTitle: query }] })
        .then(async res => {
            let ids = []
            let games = []
            let platforms = []
            for (let r of res) {
                // Search the parent game platform of the game region.
                await GamePlatformModel.findOne({ gameRegions: r._id }, { populate: ['developer', 'platform'] })
                    .then(async res => {
                        // Avoid returning already linked games.
                        if (!req.includes(res._id)) {
                            // Avoid returning all regions of a game.
                            if (!ids.includes(res._id)) {
                                // Populate parent with the region.
                                res.child = r
                                // Get linked games' platforms names.
                                for (let g of res.gamePlatforms) {
                                    await GamePlatformModel.findOne({ _id: g }, { select: ['platform'], populate: ['platform'] })
                                        .then(res => platforms.push(res.platform.name))
                                }
                                res.platforms = platforms
                                // Add game to return array.
                                games.push(res)
                                // Blacklist IDs.
                                ids = ids.concat(res.gamePlatforms)
                                // Reset platforms names list.
                                platforms = []
                            }
                        }
                    })
            }
            // Return search results.
            return games
        })
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