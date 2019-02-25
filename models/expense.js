'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExpenseSchema = Schema({
    cod:String,
    rut: Number,
    dv: String,
    name: String,
    category: String,
    description: String,
    price:Number,
    addDate: Date
})



module.exports = mongoose.model('Expense', ExpenseSchema)