'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    rutEmp: Number,
    dvEmp: String,
    sucursal:Number,
    cod:Number,
    name: String,
    picture: String,
    cost: Number,
    price:Number,
    category: String,
    description: String,
    stock: Number,
    addDate: Date
})



module.exports = mongoose.model('Product', ProductSchema)