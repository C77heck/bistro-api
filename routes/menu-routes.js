const express = require('express');
const { check } = require('express-validator');

const menuController = require('../controllers/menu-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.get('/', menuController.getMenuItems);

router.use(checkAuth);

router.post('/newitem', [
    check('name').not().isEmpty().escape().trim(),
    check('description').escape().trim(),
    check('price').not().isEmpty().escape().trim(),
    check('type').not().isEmpty().escape().trim(),
], menuController.createMenuItem);
//perhaps rework the input from description to make it the right form in all cases.

router.patch('/updateitem', [
    check('id').not().isEmpty().escape().trim(),
    check('name').escape().trim(),
    check('description').escape().trim(),
    check('price').escape().trim(),
    check('type').escape().trim(),
], menuController.updateItem);
//perhaps this will bug out for the validation so check back later

router.delete('/deleteitem/', [
    check('*').not().isEmpty().escape()
],
    menuController.deleteItem
);



module.exports = router;