'use strict'

const User = require('../models/user')
const service = require('../services/index')

const signUp = (req, res) => {
    console.log('POST /api/signup')
    console.log(req.body)
    User.findOne({rutEmp: req.body.rutEmp,rut: req.body.rut}, (err,usr)=>{
        if (err) res.status(500).send({message: `Error : ${err}`})
        if(!usr){
            const newUser = new User()
            newUser.rutEmp = req.body.rutEmp
            newUser.dvEmp = req.body.dvEmp
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
            newUser.save(err => {
                if(err) res.status(500).send({message: `Error al crear usuario error: ${err}`, cod:0})
    
                return res.status(200).send({token: service.createToken(newUser), cod: 1})
            })
        } else {
             return res.status(404).send({message: 'usuario ya existe', cod: 0})
        }
    })       
}
const signIn = (req, res) => {
    console.log('POST /api/signin')
    console.log(req.body)
    User.findOne({rut: req.body.rut},(err, user)=>{
        if(err) return res.status(500).send({message:`Error: ${err}`})
        if(!user) return res.status(404).send({message: `No existe el usuario`})
        const usr = new User()
        let val = usr.comparePassword(req.body.password,user.password)
        if(val == true){
            res.status(200).send({
                message: `Te has logeado correctamente`,
                token: service.createToken(user)})
        } else {
            res.status(404).send({message: `Contraseña incorrecta`, cod:0})
        }
    })
}

const getUsers = (req, res) =>{
    console.log('GET /api/users')
    console.log(req.body)
    User.find((err, user)=>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!user) return res.status(404).send({message: `No existen user`})
        return res.status(200).json(user)
    })
}
const getUserByRut = (req, res) => {
    console.log('GET /api/user/:rut')
    console.log(req.body)
    let rut = req.params.rut
    User.findOne({rut},(err, user) => {
        if(err) return res.status(500).send({message: `Error al realizar la peticion, error: ${err}`})
        if (!user) return res.status(404).send({message: `No existe el usuario`})
        return res.status(200).json(user)
    })
}

const getUserById = (req, res) => {
    console.log('GET /api/users/:id')
    console.log(req.body)
    let _id = req.params.id
    User.findById({_id},(err, user) => {
        if(err) return res.status(500).send({message: `Error al realizar la peticion, error: ${err}`})
        if(!user) return res.status(404).send({message:`No existe el usuario`})
        return res.status(200).json({rutEmp: user.rutEmp, dvEmp: user.dvEmp, rut:user.rut, dv:user.dv, name: user.name, email: user.email, avatar: user.avatar, role: user.role, active: user.active})
    })
}

const getUserByRutEmp = (req, res) => {
    console.log('GET /api/usersRutEmp/:rutEmp')
    console.log(req.body)
    let rutEmp = req.params.rutEmp
    User.find({rutEmp},(err, user) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición, error: ${err}`})
        if(!user) return res.status(404).send({message: `No existen usuarios`})
        return res.status(200).json(user)
    })
}

module.exports={
    signUp,
    signIn,
    getUsers,
    getUserByRut,
    getUserById,
    getUserByRutEmp
}