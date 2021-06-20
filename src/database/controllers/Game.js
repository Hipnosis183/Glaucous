import GamePlatformModel from '../models/GamePlatform'
import GameRegionModel from '../models/GameRegion'
import GameVersionModel from '../models/GameVersion'

let Region
let Version

export async function createGame (req) {
    // Create a version for the game.
    await createGameVersion(req)
    // Create a region for the game.
    await createGameRegion(req)
    // Create platform for the game.
    await createGamePlatform(req)
}

// Create a specific game for a determined platform.
async function createGamePlatform (req) {
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
};

// Create a specific region for a determined game.
async function createGameRegion (req) {
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
async function createGameVersion (req) {
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

// Search for a specific game.
export async function getGame (req) {
    return await GamePlatformModel.findOne({ _id: req._id }, { populate: true })
}

// Search for all games.
export async function getGames () {
    return await GamePlatformModel.find({}, { populate: true })
}