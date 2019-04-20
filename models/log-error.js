'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogErrorScheme = Schema({
    component: String,
    function: String,
    description: String,
    user: String,
    date: Date,
})

module.exports = mongoose.model('LogError', LogErrorScheme)