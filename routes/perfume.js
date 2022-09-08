const express = require('express')
const router = express.Router();

const {
    getHomepage,
    createReceipt,
    getAuthor,
    getAllOrders,
} = require('../controllers/perfume')

router.route('/').get(getHomepage)
router.route('/receipt').post(createReceipt)
router.route('/author').get(getAuthor)
router.route('/allorders').get(getAllOrders)

module.exports = router