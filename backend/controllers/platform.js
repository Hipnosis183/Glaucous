var platformModel = require('../models/platform');

module.exports.getPlatforms = function (req, res, next) {
    // Search for all platforms.
    platformModel.find()
        .exec(function (err, platformList) {
            // Return a JSON formatted list.
            res.json(platformList);
        });
}

// Create new system platform.
module.exports.createPlatform = function (req, res, next) {
    // Create platform model.
    var platform = new platformModel({
        name: req.body.name
    });
    // Save model to database.
    platform.save();
}