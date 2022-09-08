//import dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const Order = require('./models/perfume')

/*******************************  Coonect to DB  ******************************************/
const connectDB = require('./DB/connect')
require('dotenv').config()

//global variables
var myApp = express();
myApp.use(bodyParser.urlencoded({ extended: true })); // use  QS- supports nesting, array etc true
//using query string library, it doesn't support array rich objects. false

// // set up DB connection
// mongoose.connect('mongodb://localhost:27017/perfumestore', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });



//setting path for public folder (js and css files) and views (for html file) 
myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname + '/public'));

//defining view engine to be used
myApp.set('view engine', 'ejs');

// validating phone number
var phoneRegex = /^[0-9]{3}\-?[0-9]{3}\-?[0-9]{4}$/
var positiveNumberRegex = /^[0-9]$/

// function to check a string
function checkRegex(userInput, regex) {
    if (regex.test(userInput)) {
        return true;
    } else {
        return false;
    }
}

// customizing validation for phone number
function customPhoneValidation(value) {
    if (!checkRegex(value, phoneRegex)) {
        throw new Error('Phone number is incorrect');
    }
    return true;
}

// customizing validation for quantities (must be positive) and the subtotal must be greater than 10 
// if the quantities are negative or not an integer and/or subtotal is less than 10 it will throw an error
function customQuantity(apple) {

    if (!checkRegex(apple, positiveNumberRegex)) {
        throw new Error('Quantity is incorrect');
    }
}

// creating an object for all the validations
var valid = [
    check('name', 'Name is required').notEmpty(), // checking name is not empty
    check('address', 'Address is required').notEmpty(), //checking address is not empty
    check('province', 'Province is required').notEmpty(), // checking province field is not empty
    check('city', 'City is required').notEmpty(), // checking city field is not empty
    check('email', 'Email is incorrect').isEmail(), // checking if emails are in right format
    check('phone', '').custom(customPhoneValidation), // checking if phone number is in right format
]

// setting up different routes
// setting up homepage
myApp.get('/', function(req, res) {
    res.render('homepage');
})

// setting up phone submission handler
myApp.post('/receipt', valid, function(req, res) {
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
})

// setting up author page

myApp.get('/author', function(req, res) {
    res.render('author', {
        name: 'Srishti Parti',
        studentID: '8693901'
    });
})

// getting all orders
myApp.get('/allorders', function(req, res) {
    Order.find({}).exec(function(err, orders) {
        res.render('allorders', { orders: orders });
        console.log(orders);
    })
});

const port = 5000

//start the server and listen to port 2391
/***********************  Connecting to DB first before listening  ******************************************/
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        myApp.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start()