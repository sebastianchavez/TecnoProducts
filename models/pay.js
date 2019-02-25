'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaySchema = Schema({
    rutEmp: Number,
    codPay:Number,
    idPay:String,
    name: String,
    price:Number,
    datePay:Date,
    date: Number
})

module.exports = mongoose.model('Pay', PaySchema)