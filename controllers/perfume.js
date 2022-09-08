const Order = require('../models/perfume')
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

const getHomepage = async(req, res) => {
    try {
        res.render('homepage');
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}

const createReceipt = async(req, res) => {
    try {
        const errors = validationResult(req);

        // if errors is not empty, the submit button won't take user to receipt
        if (!errors.isEmpty()) {
            res.render('homepage', {
                errors: errors.array()
            })
        }

        // the information entered by user is correct.. proceeding to calculate receipt amount
        else {
            // getting all inputs from user
            var name = req.body.name;
            var email = req.body.email;
            var phone = req.body.phone;
            var address = req.body.address;
            var city = req.body.city;
            var province = req.body.province;
            var apple = req.body.apple;
            var rose = req.body.rose;
            var lavender = req.body.lavender;
            var lily = req.body.lily;

            // calculating the cost of each item
            var appleCost = apple * 5;
            var roseCost = rose * 5;
            var lavenderCost = lavender * 5
            var lilyCost = lily * 4;

            // total without tax 
            var subtotal = appleCost + roseCost + lavenderCost + lilyCost;

            // calculating tax based on each province. Data retrieved from - https://www.retailcouncil.org/resources/quick-facts/sales-tax-rates-by-province/
            if (province == "Alberta" || province == "British Columbia" || province == "Manitoba" || province == "Northwest Territories" || province == "Nunavut" ||
                province == "Quebec" || province == "Saskatchewan" || "Yukon") {
                var tax = subtotal * 0.05;
            }
            if (province == "Ontario") {
                var tax = subtotal * 0.13;
            } else {
                var tax = subtotal * 0.15;
            }

            // calculating total amount
            var total = subtotal + tax;

            // creating pageData object to pass to receipt page which has all attributes (user inputs and calcuated values)
            var pageData = {
                name: name,
                email: email,
                phone: phone,
                address: address,
                city: city,
                province: province,
                rose: rose,
                roseCost: roseCost,
                apple: apple,
                appleCost: appleCost,
                lavender: lavender,
                lavenderCost: lavenderCost,
                lily: lily,
                lilyCost: lilyCost,
                subtotal: subtotal,
                tax: tax,
                total: total
            }

            //store the order to the database
            var newOrder = new Order(pageData);
            //saving the order
            newOrder.save().then(function() {
                    console.log("new order created");
                })
                // printing pageData object in receipt page
            res.render('receipt', pageData);
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getAuthor = async(req, res) => {
    try {
        res.render('author', {
            name: 'Srishti Parti',
            studentID: '8693901'
        });
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const getAllOrders = async(req, res) => {
    try {
        Order.find({}).exec(function(err, orders) {
            res.render('allorders', { orders: orders });
            console.log(orders);
        })

    } catch (error) {
        res.status(500).json({ msg: error })
    }

}


module.exports = { getHomepage, createReceipt, getAuthor, getAllOrders }