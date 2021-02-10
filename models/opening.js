const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;


const openingSchema = new Schema({
    monday: { type: String, require: true },
    tuesday: { type: String, require: true },
    wednesday: { type: String, require: true },
    thursday: { type: String, require: true },
    friday: { type: String, require: true },
    saturday: { type: String, require: true },
    sunday: { type: String, require: true },
    date: { type: String, require: true }
})


openingSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Opening', openingSchema);

