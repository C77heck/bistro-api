const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Testimonial = require('../models/testimonial');
const Opening = require('../models/opening');
const Story = require('../models/story');
const Expiry = require('../models/expiry');



//CONTROLLER FUNCTIONS

const getExpiries = async (req, res, next) => {
    let expiries;
    try {
        expiries = await Expiry.find({});
    } catch (err) {
        return next(new HttpError(
            'Something went wrong on server side',
            500
        ))
    }

    res.json({ expiries: expiries[0] })

}

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

    let expiries;
    try {
        expiries = await Expiry.find({});
    } catch (err) {
        return next(new HttpError(
            'Something went wrong on server side',
            500
        ))
    }


    res.json({ testimonial: testimonial[0], expiry: expiries[0].testimonial });

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

    let expiries;
    try {
        expiries = await Expiry.find({});
    } catch (err) {
        return next(new HttpError(
            'Something went wrong on server side',
            500
        ))
    }

    res.json({ opening: opening[0], expiry: expiries[0].opening });

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
    /*  we register the new creation date so the front end can fetch and
         save to locale storage upon next visit */
    let expiries;
    try {
        expiries = await Expiry.find({});
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }

    expiries[0].opening = new Date().getTime();
    try {
        expiries[0].save();
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


    /*  we register the new creation date so the front end can fetch and
     save to locale storage upon next visit */
    let expiries;
    try {
        expiries = await Expiry.find({});
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }

    expiries[0].testimonial = new Date().getTime();
    try {
        expiries[0].save();
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }

    res.status(201).json({ message: 'Rólunk szekció sikeresen frissítve.' });
}

const getStories = async (req, res, next) => {

    let story;
    try {
        story = await Story.find({})
    } catch (err) {
        return next(new HttpError(
            'Sorry something went wrong on our side.',
            500
        ))
    }

    let expiries;
    try {
        expiries = await Expiry.find({});
    } catch (err) {
        return next(new HttpError(
            'Something went wrong on server side',
            500
        ))
    }

    res.json({ story: story[0], expiry: expiries[0].story });
};



const updateStory = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors, req.body)
        return next(new HttpError(
            'Helytelen adat, kérlek ellenőrízd és próbáld ujra.',
            422
        ))
    }

    const {
        firsth2,
        firsth3,
        firstp,
        secondh2,
        secondp
    } = req.body;

    try {
        await Story.replaceOne({}, {
            firsth2,
            firsth3,
            firstp,
            secondh2,
            secondp
        })
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }


    /*  we register the new creation date so the front end can fetch and
 save to locale storage upon next visit */
    let expiries;
    try {
        expiries = await Expiry.find({});
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }

    expiries[0].story = new Date().getTime();
    try {
        expiries[0].save();
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }

    res.status(201).json({ message: 'Változtatás sikeres.' })
}

// EXPORTS

exports.getTestimonial = getTestimonial;
exports.getOpeningTime = getOpeningTime;
exports.updateOpeningTime = updateOpeningTime;
exports.updateTestimonial = updateTestimonial;
exports.updateStory = updateStory;
exports.getStories = getStories;
exports.getExpiries = getExpiries