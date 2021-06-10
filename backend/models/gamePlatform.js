const { Schema, model } = require('mongoose');

const gamePlatformSchema = new Schema({
    otherPlatforms: [{ type: Schema.Types.ObjectId, ref: 'gamePlatform', required: true }],
    developer: { type: Schema.Types.ObjectId, ref: 'developer', required: true },
    platform: { type: Schema.Types.ObjectId, ref: 'platform', required: true },
    releaseYear: { type: String, required: true },
    numberPlayers: { type: String, required: true },
    latestVersion: { type: String }
});

gamePlatformSchema.set('toObject', { virtuals: true });
gamePlatformSchema.set('toJSON', { virtuals: true });

module.exports = model('gamePlatform', gamePlatformSchema);