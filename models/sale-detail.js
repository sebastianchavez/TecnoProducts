'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaleDetailSchema = Schema({
    rutEmp: Number,
    dvEmp: String,
    cod: Number,
    codProd: String,
    description: String,
    quantity: Number,
    value:Number
})

module.exports = mongoose.model('SaleDetail', SaleDetailSchema)