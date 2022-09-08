const mongoose = require('mongoose')
const Order = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    province: String,
    rose: Number,
    roseCost: Number,
    apple: Number,
    appleCost: Number,
    lavender: Number,
    lavenderCost: Number,
    lily: Number,
    lilyCost: Number,
    subtotal: Number,
    tax: Number,
    total: Number
})

module.exports = mongoose.model('Perfume', Order)