const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Testimonial = require('../models/testimonial');
const Opening = require('../models/opening');



//CONTROLLER FUNCTIONS


const getInputs = async (req, res, next) => {

    let inputs;
    try {
        inputs = await Input.find({})
    } catch (err) {
        return next(new HttpError(
            'Something went wrong on our side. Please try again later',
            500
        ))
    }

    let opening;
    try {
        opening = await Opening.find({})
    } catch (err) {
        return next(new HttpError(
            'Something went wrong on our side. Please try again later',
            500
        ))
    }

    res.json({ inputs: inputs, opening: opening });

}



const updateOpeningTime = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Invalid inputs passed, please check your data',
            422
        ))
    }

    const body = req.body;

    //admin authentication to implement...
    try {
        await Opening.replaceOne({}, {
            monday: body.monday,
            tuesday: body.tuesday,
            wednesday: body.wednesday,
            thursday: body.thursday,
            friday: body.friday,
            saturday: body.saturday,
            sunday: body.sunday,
            date: new Date()
        })
    } catch (err) {
        return next(new HttpError(
            'Sorry but something went wrong, please try again later',
            500
        ))
    }

    res.status(201).json({ message: 'Opening times have been succesfully updated' })

}


const updateTestimonial = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Invalid inputs passed, please check your data',
            422
        ))
    }
    const image = req.file.path;
    const { quote, text } = req.body;

    //admin authentication to implement...
    try {
        await Testimonial.replaceOne({}, {
            image: image,
            quote: quote,
            text: text,
            date: new Date()
        })
    } catch (err) {
        return next(new HttpError(
            'Sorry but something went wrong, please try again later',
            500
        ))
    }

    res.status(201).json({ message: 'The testimonial has been succesfully updated ' });
}

// EXPORTS

exports.getInputs = getInputs;
exports.updateOpeningTime = updateOpeningTime;
exports.updateTestimonial = updateTestimonial;
