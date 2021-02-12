const express = require('express');
const { check } = require('express-validator');

const fileUpload = require('../middleware/file-upload')

const inputController = require('../controllers/input-controller');

const router = express.Router();


// get all input resources for the website rendering
router.get('/testimonial', inputController.getTestimonial);
router.get('/openingtime', inputController.getOpeningTime);



// opening time handler

router.patch('/openingtime', [
    check('monday').escape().trim(),
    check('tuesday').escape().trim(),
    check('wednesday').escape().trim(),
    check('thursday').escape().trim(),
    check('friday').escape().trim(),
    check('saturday').escape().trim(),
    check('sunday').escape().trim()
], inputController.updateOpeningTime);

// chef about us text

router.patch('/testimonial',
    fileUpload.single('image'),
    [
        check('quote').not().isEmpty().isLength({ min: 15, max: 40 }).escape().trim(),
        check('text').isLength({ min: 100, max: 750 }).escape().trim()
    ], inputController.updateTestimonial);
// sort it so the image won't change if not passed a new one.




module.exports = router;