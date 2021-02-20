const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Menu = require('../models/menu');
const Expiry = require('../models/expiry');



//CONTROLLER FUNCTIONS


const getMenuItems = async (req, res, next) => {

    let menu;
    try {
        menu = await Menu.find({})
    } catch (err) {
        return next(new HttpError(
            'Something went wrong on our side. Please try again later',
            500
        ))
    }

    let expiries;
    try {
        expiries = await Expiry.find({});
    } catch (err) {
        return next(new HttpError(
            `Something went wrong on server side`,
            500
        ))
    }

    res.json({ menu: menu, expiry: expiries[0].menu });
    //delete the message 
}


const createMenuItem = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Helytelen adat, kérlek ellenőrízd és próbáld ujra.',
            422
        ))
    }

    /* need to build the admin login and authentications */

    const { name, description, price, type } = req.body;
    const newItem = new Menu({
        name: name,
        description: description.length > 0 ? description : '',
        price: price,
        type: type
    })

    try {

        newItem.save()

    } catch (err) {
        return next(new HttpError(
            'Sikertelen próbálkozás, kérlek próbáld meg késöbb.',
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

    expiries[0].menu = new Date().getTime();
    try {
        expiries[0].save();
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }



    res.status(201).json({ message: 'Sikeresen hozzáadva.', item: newItem })
    //remove the item return

}

const updateItem = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Helytelen adat, kérlek ellenőrízd és próbáld ujra.',
            422
        ))
    }

    const { name, description, price, type, id } = req.body;

    //admin authentication to implement...
    try {
        await Menu.replaceOne({ _id: id }, {
            name: name,
            description: description,
            price: price,
            type: type

        })
    } catch (err) {
        return next(new HttpError(
            'Sikertelen update, kérlek próbáld meg késöbb.',
            404
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

    expiries[0].menu = new Date().getTime();
    try {
        expiries[0].save();
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.',
            500
        ))
    }

    res.status(201).json({ message: 'A változások sikeresen mentésre kerültek.' })


}


const deleteItem = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Helytelen adat, kérlek ellenőrízd és próbáld ujra.',
            422
        ))
    }

    const { id, name } = req.body;
    //admin authentication to implement...

    try {
        if (id !== undefined) {
            await Menu.deleteOne({ _id: id })
        } else {
            await Menu.deleteOne({ name: name })

        }
    } catch (err) {
        return next(new HttpError(
            'Sikertelen törlés, kérlek próbáld meg mégegyszer.1',
            500
        ))
    };


    /*  we register the new creation date so the front end can fetch and
     save to locale storage upon next visit */
    let expiries;
    try {
        expiries = await Expiry.find({});
    } catch (err) {
        return next(new HttpError(
            'Sikertelen probalkozás, kérlek póbáld meg késöbb.2',
            500
        ))
    }

    expiries[0].menu = new Date().getTime();
    try {
        expiries[0].save();
    } catch (err) {
        return next(new HttpError(
            `Sikertelen probalkozás, kérlek póbáld meg késöbb. ${err}`,
            500
        ))
    }

    res.status(201).json({ message: 'Törlés sikeres.' });
}

// EXPORTS

exports.createMenuItem = createMenuItem;
exports.getMenuItems = getMenuItems;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;