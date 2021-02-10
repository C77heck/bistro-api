const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;


const testimonialSchema = new Schema({
    image: { type: String, required: true },
    quote: { type: String, require: true },
    text: { type: String, require: true },
    date: { type: String, require: true }
})


testimonialSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Testimonial', testimonialSchema);
