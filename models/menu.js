const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;


const menuSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String},
    price: { type: String, require: true },
    type: { type: String, require: true }//burgers, platillos, mexicanos, double, nachos, arroz, dippers, desserts, extras, drinks
})


menuSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Menu', menuSchema);

