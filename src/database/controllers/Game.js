import GamePlatformModel from '../models/GamePlatform'
import GameRegionModel from '../models/GameRegion'
import GameVersionModel from '../models/GameVersion'
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