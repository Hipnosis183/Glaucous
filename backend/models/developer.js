const { Schema, model } = require('mongoose');

const developerSchema = new Schema({
    name: { type: String, required: true }
});

developerSchema.set('toObject', { virtuals: true });
developerSchema.set('toJSON', { virtuals: true });

module.exports = model('developer', developerSchema);