

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

const { validationResult } = require('express-validator');


const HttpError = require('../models/http-error');
const Admin = require('../models/admin');


const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(
            `Invalid inputs passed, please check your data`,
            422
        ))
    }
    const {
        email,
        accountID,
        password,
    } = req.body;


    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (err) {

        return next(new HttpError(
            'Could not create user, please try again.',
            500
        ))
    }


    const createdUser = new Admin({

        email,
        password: hashedPassword,
        accountID,
        status: {
            isLoggedIn: true,
            isBlocked: false,
            loginAttempts: 0
        }
    })

    try {
        createdUser.save();
    } catch (err) {

        return next(new HttpError(
            'Signing up failed, please try again',
            500
        ))
    }

    res
        .status(201)
        .json({

            adminData: {
                message: 'succesfully signed up.',
                userId: createdUser.id,
            }
        })

}



const signin = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Helytelen adat, kérlek ellenőrízd és próbáld ujra.',
            503
        ))
    }
    const { accountID, password } = req.body;

    let existingUser;

    try {
        existingUser = await Admin.findOne({ accountID: accountID })
    } catch (err) {
        return next(new HttpError(
            `Karbantartás végett elérhetetlen a belépés. kérlek probáld meg késöbb.`,
            500
        ))
    }

    if (!existingUser) {
        return next(new HttpError(
            'Híbás ID vagy jelszó!',
            401
        ))
    }
    if (existingUser.status.loginAttempts > 4) {
        throw new HttpError(
            'Ez a fiók zárolva lett 60 percig',
            401
        );
    };

    let isValidPassword = false;

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (err) {
        return next(new HttpError(
            'Hibás fiók ID vagy jelszó!',
            401
        ))
    }

    if (!isValidPassword) {

        existingUser.status.loginAttempts += 1;
        existingUser.save();
        return next(new HttpError(
            'Hibás fiók ID vagy jelszó!',
            401
        ))
    } else {
        existingUser.status.passwordRequest = 0;
        existingUser.status.isLoggedIn = true;
        existingUser.save();
    }



    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        )
    } catch (err) {

        return next(new HttpError(
            'Kérlek próbáld ujra.',
            500
        ))
    }

    res.json({
        adminData: {
            userId: existingUser.id,
            token: token,
        }
    })




}



const signout = async (req, res, next) => {

    const userId = req.params.pid;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Invalid inputs passed, please check your data',
            422
        ))
    }

    let user;

    try {
        user = await User.findById(userId)
    } catch (err) {
        console.log(err)
    }

    try {
        user.status.loginAttempts = 0;
        user.status.isLoggedIn = false;
        await user.save();
    } catch (err) {
        console.log(err)
    }
    res.status(201).json({ message: 'Sikeres kiléptetés.' })
}



exports.signup = signup;
exports.signin = signin;
exports.signout = signout;
