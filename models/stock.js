'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StockSchema = Schema({
    rutEmp: Number,
    codProd: Number,
    operation: String,
    quantity:Number,
    date: Date
})
module.exports = mongoose.model('Stock', StockSchema)