//import dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/perfume')

/*******************************  Coonect to DB  ******************************************/
const connectDB = require('./DB/connect')
require('dotenv').config()

//global variables
var myApp = express();
myApp.use(bodyParser.urlencoded({ extended: true })); // use  QS- supports nesting, array etc true
//using query string library, it doesn't support array rich objects. false



//setting path for public folder (js and css files) and views (for html file) 
myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname + '/public'));
myApp.use(routes)

//defining view engine to be used
myApp.set('view engine', 'ejs');


const port = process.env.PORT || 5000

//const port = 4000

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