const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const expirySchema = new Schema({
    menu: { type: Number, require: true },
    testimonial: { type: Number, require: true },
    opening: { type: Number, require: true },
    story: { type: Number, require: true }
});

expirySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Expiry', expirySchema);

