var developerModel = require('../models/developer');

model.export.getDevelopers = function (req, res, next) {
    // Search for all developers.
    developerModel.find()
    .exec(function (developerList) {
        // Return a JSON formatted list.
        res.json(developerList);
    });
}

// Create new game developer.
model.export.createDeveloper = function (req, res, next) {
    // Create developer model.
    var developer = new developerModel({
        name: req.body.name
    });
    // Save model to database.
    developer.save();
}