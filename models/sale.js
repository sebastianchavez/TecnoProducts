'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaleSchema = Schema({
    rutEmp: Number,
    dvEmp: String,
    cod: Number,
    type: String,
    date:Date,
    client: Number,
    total: Number,
    state: String
})

module.exports = mongoose.model('Sale', SaleSchema)