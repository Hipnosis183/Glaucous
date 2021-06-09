const { Schema, model } = require('mongoose');

const platformSchema = new Schema({
    name: { type: String, required: true }
});

platformSchema.set('toObject', { virtuals: true });
platformSchema.set('toJSON', { virtuals: true });

module.exports = model('platform', platformSchema);