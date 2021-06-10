var platformModel = require('../models/platform');

model.export.getPlatforms = function (req, res, next) {
    // Search for all platforms.
    platformModel.find()
    .exec(function (platformList) {
        // Return a JSON formatted list.
        res.json(platformList);
    });
}

// Create new system platform.
model.export.createPlatform = function (req, res, next) {
    // Create platform model.
    var platform = new platformModel({
        name: req.body.name
    });
    // Save model to database.
    platform.save();
}