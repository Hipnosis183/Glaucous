import GamePlatformModel from '../models/GamePlatform'
import GameRegionModel from '../models/GameRegion'
import GameVersionModel from '../models/GameVersion'
import { generateID } from '../datastore'
import { getDeveloper } from './Developer'
import { getPlatform } from './Platform'

let Region
let Version

export async function newGamePlatform(req) {
    // Create a version for the game.
    await createGameVersion(req.gameVersion)
    // Create a region for the game.
    await createGameRegion(req.gameRegion)
    // Create platform for the game.
    await createGamePlatform(req.gamePlatform)
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
            await GamePlatformModel.findOneAndUpdate(
                { _id: id },
                { gameRegions: res.gameRegions },
                { populate: false }
            )
        })
}

// Create a specific game for a determined platform.
async function createGamePlatform(req) {
    // Create game platform model.
    const GamePlatform = GamePlatformModel.create({
        _id: generateID(),
        gamePlatforms: null,
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

// Search for all games.
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

// Search for all games.
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
    // Delete the game platform.
    await GamePlatformModel.findOneAndDelete({ _id: req._id })
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
                await GamePlatformModel.findOneAndUpdate(
                    { _id: req._id },
                    { gameRegions: res.gameRegions },
                    { populate: false }
                )
            })
        return true
    } else {
        // Delete the game platform.
        await GamePlatformModel.findOneAndDelete({ _id: req._id })
        return false
    }
}

// Delete all the games from the specified developer.
export async function deleteGamesD(req) {
    await GamePlatformModel.find({ developer: req })
        .then(async res => {
            // Delete all the game platforms of the platform.
            for (let p of res) {
                await deleteGamePlatform(p, true)
            }
        })
}

// Delete all the games from the specified platform.
export async function deleteGamesP(req) {
    await GamePlatformModel.find({ platform: req })
        .then(async res => {
            // Delete all the game platforms of the platform.
            for (let p of res) {
                await deleteGamePlatform(p, true)
            }
        })
}