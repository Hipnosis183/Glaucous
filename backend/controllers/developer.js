var developerModel = require('../models/developer');

module.exports.getDevelopers = function (req, res, next) {
    // Search for all developers.
    developerModel.find()
        .exec(function (err, developerList) {
            // Return a JSON formatted list.
            res.json(developerList);
        });
}

// Create new game developer.
module.exports.createDeveloper = function (req, res, next) {
    // Create developer model.
    var developer = new developerModel({
        name: req.body.name
    });
    // Save model to database.
    developer.save();
}