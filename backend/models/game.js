const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
});

gameSchema.set('toObject', { virtuals: true });
gameSchema.set('toJSON', { virtuals: true });

module.exports = model('game', gameSchema);