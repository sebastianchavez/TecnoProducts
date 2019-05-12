'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = Schema({
    rut: {type :Number, unique: true},
    dv: String,
    sucursal:Number,
    name: String,
    contact: Number,
    direction: String,
    email: {type: String, lowercase: true},
    business: String,
    active: Boolean
})



module.exports = mongoose.model('Company', CompanySchema)