const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Testimonial = require('../models/testimonial');
const Opening = require('../models/opening');



//CONTROLLER FUNCTIONS


const getTestimonial = async (req, res, next) => {

    let testimonial;
    try {
        testimonial = await Testimonial.find({})
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }



    res.json({ testimonial: testimonial[0] });

}

const getOpeningTime = async (req, res, next) => {

    let opening;
    try {
        opening = await Opening.find({})
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }

    res.json({ opening: opening[0] });

}



const updateOpeningTime = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Helytelen adat, kérlek ellenőrízd és próbáld ujra.',
            422
        ))
    }

    const body = req.body;
    console.log(body, req.body)

    //admin authentication to implement...
    try {
        await Opening.replaceOne({}, {
            monday: body.monday.length > 1 ? body.monday : "Zárva",
            tuesday: body.tuesday.length > 1 ? body.tuesday : "Zárva",
            wednesday: body.wednesday.length > 1 ? body.wednesday : "Zárva",
            thursday: body.thursday.length > 1 ? body.thursday : "Zárva",
            friday: body.friday.length > 1 ? body.friday : "Zárva",
            saturday: body.saturday.length > 1 ? body.saturday : "Zárva",
            sunday: body.sunday.length > 1 ? body.sunday : "Zárva",
            date: new Date()
        })
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }

    res.status(201).json({ message: 'A nyitvatartás sikeresen frissítve lett. ' })

}


const updateTestimonial = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors, req.body)
        return next(new HttpError(
            'Helytelen adat, kérlek ellenőrízd és próbáld ujra.',
            422
        ))
    }
    console.log(req.body)
    const { quote, text } = req.body;

    //admin authentication to implement...
    const updatedFile = {
        image: req.file.path,
        quote: quote,
        text: text,
        date: new Date()
    }

    try {
        await Testimonial.replaceOne({}, updatedFile)
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }

    res.status(201).json({ message: 'Rólunk szekció sikeresen frissítve.' });
}

// EXPORTS

exports.getTestimonial = getTestimonial;
exports.getOpeningTime = getOpeningTime;
exports.updateOpeningTime = updateOpeningTime;
exports.updateTestimonial = updateTestimonial;
