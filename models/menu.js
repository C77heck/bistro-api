const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;


const menuSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: String, require: true },
    type: { type: String, require: true }
})


menuSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Menu', menuSchema);

