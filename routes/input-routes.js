const express = require('express');
const { check } = require('express-validator');

const fileUpload = require('../middleware/file-upload')

const inputController = require('../controllers/input-controller');

const router = express.Router();


// get all input resources for the website rendering
router.get('/', inputController.getInputs);



// opening time handler

router.patch('/openingtime', [
    check('monday').not().isEmpty().escape().trim(),
    check('tuesday').not().isEmpty().escape().trim(),
    check('wednesday').not().isEmpty().escape().trim(),
    check('thursday').not().isEmpty().escape().trim(),
    check('friday').not().isEmpty().escape().trim(),
    check('saturday').not().isEmpty().escape().trim(),
    check('sunday').not().isEmpty().escape().trim()
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