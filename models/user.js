'user strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
// const crypto = require('crypto')

const userSchema = new Schema({
    rutEmp: Number,
    dvEmp: String,
    sucursal:Number,
    rut: Number,
    dv: String,
    email: {type: String, lowercase: true},
    name: String,
    avatar: String,
    password: String,
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date,
    role:String,
    active: Boolean,
    conversations:[]
})

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password,hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('User', userSchema)

