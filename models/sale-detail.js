'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaleDetailSchema = Schema({
    rutEmp: Number,
    dvEmp: String,
    codSale: Number,
    codProd: String,
    description: String,
    amount: Number,
    value:Number
})

module.exports = mongoose.model('SaleDetail', SaleDetailSchema)