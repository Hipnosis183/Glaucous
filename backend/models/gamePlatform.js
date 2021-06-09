const { Schema, model } = require('mongoose');

const gamePlatformSchema = new Schema({
    game: { type: Schema.Types.ObjectId, ref: 'game', required: true }
});

gamePlatformSchema.set('toObject', { virtuals: true });
gamePlatformSchema.set('toJSON', { virtuals: true });

module.exports = model('gamePlatform', gamePlatformSchema);