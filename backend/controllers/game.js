var developerModel = require('../models/developer');
var platformModel = require('../models/platform');
var gamePlatformModel = require('../models/gamePlatform');
var gameRegionModel = require('../models/gameRegion');
var gameVersionModel = require('../models/gameVersion');

var platform;
var region;

module.exports.createGame = function (req, res, next) {
    // Create platform for the game.
    createGamePlatform(req);
    // Create a region for the game.
    createGameRegion(req);
    // Create a version for the game.
    createGameVersion(req);
    // Return 'OK' status code.
    res.sendStatus(200);
}

// Create a specific game for a determined platform.
createGamePlatform = function (req, res, next) {
    // Create game platform model.
    var gamePlatform = new gamePlatformModel({
        otherPlatforms: null,
        developer: req.body.developer,
        platform: req.body.platform,
        releaseYear: req.body.releaseYear,
        numberPlayers: req.body.numberPlayers,
        latestVersion: req.body.latestVersion
    });
    // Store platform id.
    platform = gamePlatform._id;
    // Save model to database.
    gamePlatform.save();
};

// Create a specific region for a determined game.
createGameRegion = function (req, res, next) {
    // Create game region model.
    var gameRegion = new gameRegionModel({
        gamePlatform: platform,
        title: req.body.title,
        subTitle: req.body.subTitle,
        originalTitle: req.body.originalTitle,
        romanizedTitle: req.body.romanizedTitle,
        translatedTitle: req.body.translatedTitle,
        region: req.body.region
    });
    // Store region id.
    region = gameRegion._id;
    // Save model to database.
    gameRegion.save();
};

// Create a specific version for a determined region.
createGameVersion = function (req, res, next) {
    // Create game version model.
    var gameVersion = new gameVersionModel({
        gameRegion: region,
        currentVersion: req.body.currentVersion,
        comments: req.body.comments
    });
    // Save model to database.
    gameVersion.save();
};