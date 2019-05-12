'use strict'

const User = require('../models/user')
const service = require('../services/index')

const signUp = (req, res) => {
    try {
        User.findOne({ rutEmp: req.body.rutEmp, rut: req.body.rut }, (err, usr) => {
            if (err) res.status(500).send({ message: `Error : ${err}` })
            if (!usr) {
                const newUser = new User()
                newUser.rutEmp = req.body.rutEmp
                newUser.dvEmp = req.body.dvEmp
                newUser.sucursal = req.body.sucursal
                newUser.rut = req.body.rut
                newUser.dv = req.body.dv
                newUser.name = req.body.name
                newUser.email = req.body.email
                newUser.avatar = req.body.avatar
                newUser.password = newUser.encryptPassword(req.body.password)
                newUser.signupDate = req.body.signupDate
                newUser.lastLogin = req.body.lastLogin
                newUser.role = req.body.role
                newUser.active = req.body.active
                newUser.conversations = req.body.conversations
                newUser.save(err => {
                    if (err) res.status(500).send({ message: `Error al crear usuario error: ${err}`, cod: 0 })
                    return res.status(200).send({ token: service.createToken(newUser), cod: 1 })
                })
            } else {
                return res.status(404).send({ message: 'usuario ya existe', cod: 0 })
            }
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}
const signIn = (req, res) => {
    try {
        User.findOne({ rut: req.body.rut }, (err, user) => {
            if (err) return res.status(500).send({ message: `Error: ${err}` })
            if (!user) return res.status(404).send({ message: `No existe el usuario` })
            const usr = new User()
            let val = usr.comparePassword(req.body.password, user.password)
            if (val == true) {
                res.status(200).send({
                    message: `Te has logeado correctamente`,
                    token: service.createToken(user)
                })
            } else {
                res.status(404).send({ message: `Contraseña incorrecta` })
            }
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const getUsers = (req, res) => {
    try {
        User.find((err, user) => {
            if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
            if (!user) return res.status(404).send({ message: `No existen user` })
            return res.status(200).json(user)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}
const getUserByRut = (req, res) => {
    try {
        let rut = req.params.rut
        User.findOne({ rut }, (err, user) => {
            if (err) return res.status(500).send({ message: `Error al realizar la peticion, error: ${err}` })
            if (!user) return res.status(404).send({ message: `No existe el usuario` })
            return res.status(200).json(user)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const getUserById = (req, res) => {
    try {
        let _id = req.params.id
        User.findById({ _id }, (err, user) => {
            if (err) return res.status(500).send({ message: `Error al realizar la peticion, error: ${err}` })
            if (!user) return res.status(404).send({ message: `No existe el usuario` })
            return res.status(200).json({ rutEmp: user.rutEmp, dvEmp: user.dvEmp, rut: user.rut, dv: user.dv, name: user.name, email: user.email, avatar: user.avatar, role: user.role, active: user.active })
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const getUserByRutEmp = (req, res) => {
    try {
        let rutEmp = req.params.rutEmp
        User.find({ rutEmp }, (err, user) => {
            if (err) return res.status(500).send({ message: `Error al realizar la petición, error: ${err}` })
            if (!user) return res.status(404).send({ message: `No existen usuarios` })
            return res.status(200).json(user)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUserByRut,
    getUserById,
    getUserByRutEmp
}