const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Menu = require('../models/menu');



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


    res.json({ menu: menu });
    //delete the message 
}


const createMenuItem = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Invalid inputs passed, please check your data',
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
            'Creating product failed, please try again.',
            500
        ))
    }

    res.status(201).json({ message: 'Product has been added.', item: newItem })
    //remove the item return

}

const updateItem = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Invalid inputs passed, please check your data',
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
            'Sorry but this product is not in our database',
            404
        ))
    }

    res.status(201).json({ message: 'A változások sikeresen mentésre kerültek.' })


}


const deleteItem = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Invalid inputs passed, please check your data',
            422
        ))
    }

    const id = req.param.pid;
    console.log('we are in', req.param.pid)
    //admin authentication to implement...
    let item;
    try {
        item = await Menu.findById(id)
    } catch (err) {
        return next(new HttpError(
            'Could not delete item, please try again.',
            500
        ))
    };
    try {
        await Menu.deleteOne({ _id: id })
    } catch (err) {
        return next(new HttpError(
            'Could not delete item, please try again.',
            500
        ))
    };

    res.status(201).json({ message: 'Törlés sikeres.' });
}

// EXPORTS

exports.createMenuItem = createMenuItem;
exports.getMenuItems = getMenuItems;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;