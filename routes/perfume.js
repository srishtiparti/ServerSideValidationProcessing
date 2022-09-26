const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { customPhoneValidation } = require('../validations/validations')

var valid = [
    check('name', 'Name is required').notEmpty(), // checking name is not empty
    check('address', 'Address is required').notEmpty(), //checking address is not empty
    check('province', 'Province is required').notEmpty(), // checking province field is not empty
    check('city', 'City is required').notEmpty(), // checking city field is not empty
    check('email', 'Email is incorrect').isEmail(), // checking if emails are in right format
    check('phone', '').custom(customPhoneValidation), // checking if phone number is in right format
]

const {
    getHomepage,
    createReceipt,
    getAuthor,
    getAllOrders,
} = require('../controllers/perfume')

router.route('/').get(getHomepage)
router.route('/receipt').post(valid, createReceipt)
router.route('/author').get(getAuthor)
router.route('/allorders').get(getAllOrders)

module.exports = router