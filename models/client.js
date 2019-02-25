'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = Schema({
    rut: {type :Number, unique: true},
    dv: String,
    name: String,
    contact: Number,
    direction: String,
    commune: String,
    region: String
})



module.exports = mongoose.model('Client', ClientSchema)