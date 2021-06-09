const { Schema, model } = require('mongoose');

const gameRegionSchema = new Schema({
    gamePlatform: { type: Schema.Types.ObjectId, ref: 'gamePlatform', required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    originalTitle: { type: String },
    romanizedTitle: { type: String },
    translatedTitle: { type: String },
    region: { type: String, required: true },
    developer: { type: Schema.Types.ObjectId, ref: 'developer', required: true },
    platform: { type: Schema.Types.ObjectId, ref: 'platform', required: true },
    releaseYear: { type: String, required: true },
    numberPlayers: { type: String, required: true },
    latestVersion: { type: String }
});

gameRegionSchema.virtual('fullTitle').get(function () {
    return this.title + this.subTitle;
});
gameRegionSchema.virtual('hasSymbols').get(function () {
    return this.originalTitle ? true : false;
});

gameRegionSchema.set('toObject', { virtuals: true });
gameRegionSchema.set('toJSON', { virtuals: true });

module.exports = model('gameRegion', gameRegionSchema);