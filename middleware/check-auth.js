const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const Admin = require('../models/admin');

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    // token authentication.
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            throw new Error('Síkertelen admin azonosítás!')
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        req.userData = { userId: decodedToken.userId }
        //next();


    } catch (err) {
        return next(new HttpError(
            'Síkertelen admin azonosítás!',
            401
        ))
    }

    //we check if the admin is logged in or not for security sake.
    let admin;
    try {
        admin = await Admin.find({})
    } catch (err) {
        return next(new HttpError(
            'Síkertelen admin azonosítás!',
            401
        ))
    }

    if (!admin[0].status.isLoggedIn) {
        throw new HttpError(
            'Síkertelen admin azonosítás!',
            401
        )
    } else {
        next();
    }



}