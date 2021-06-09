const { Schema, model } = require('mongoose');

const gameVersionSchema = new Schema({
    gameRegion: { type: Schema.Types.ObjectId, ref: 'gameRegion', required: true },
    currentVersion: { type: String },
    comments: { type: String }
});

gameVersionSchema.virtual('format').get(function () {
    return;
});
gameVersionSchema.virtual('filesize').get(function () {
    return;
});

gameVersionSchema.set('toObject', { virtuals: true });
gameVersionSchema.set('toJSON', { virtuals: true });

module.exports = model('gameVersion', gameVersionSchema);