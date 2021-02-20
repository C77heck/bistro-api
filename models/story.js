const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const storySchema = new Schema({
    firsth2: { type: String, required: true },
    firsth3: { type: String, required: true },
    firstp: { type: String, required: true },
    secondh2: { type: String, required: true },
    secondp: { type: String, required: true }
});

storySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Story', storySchema);
