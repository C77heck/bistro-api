const express = require('express');
const { check } = require('express-validator');

const fileUpload = require('../middleware/file-upload')

const inputController = require('../controllers/input-controller');
const checkAuth = require('../middleware/check-auth');
const Expiry = require('../models/expiry');

const router = express.Router();


// get all input resources for the website rendering
router.get('/testimonial', inputController.getTestimonial);
router.get('/openingtime', inputController.getOpeningTime);
router.get('/story', inputController.getStories);
router.get('/expiries', inputController.getExpiries);


// opening time handler
router.use(checkAuth);
router.patch('/openingtime', [
    check('*').escape().trim(),
], inputController.updateOpeningTime);

// chef about us text

router.patch('/testimonial',
    [
        check('quote').not().isEmpty().isLength({ min: 15, max: 40 }).escape().trim(),
        check('text').isLength({ min: 100, max: 750 }).escape().trim()
    ], inputController.updateTestimonial);
// sort it so the image won't change if not passed a new one.


router.patch('/story', [
    check('*').not().isEmpty().trim().escape()
], inputController.updateStory);


module.exports = router;