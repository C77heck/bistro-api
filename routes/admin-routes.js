const express = require('express');
const { check } = require('express-validator');

const adminController = require('../controllers/admin-controller');

const router = express.Router();

router.post('/adminsignup', [
    check('*').not().isEmpty().trim().escape()
], adminController.signup)

router.post('/adminsignin',
    [
        check('accountID').not().isEmpty().escape().trim(),
        check('password').not().isEmpty()

    ],
    adminController.signin
);



router.get('/adminsignout/:pid', adminController.signout);



module.exports = router;