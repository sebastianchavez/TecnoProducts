'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StockSchema = Schema({
    rutEmp: Number,
    dvEmp:String,
    sucursal:Number,
    codProd: Number,
    operation: String,
    amount:Number,
    date: Date,
    user:String
})
module.exports = mongoose.model('Stock', StockSchema)