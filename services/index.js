'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

const createToken = (user) =>{
    const payload ={
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(10, 'days').unix(),
    }

    return jwt.encode(payload,config.SECRET_TOKEN)
}

const decodeToken = (token) => {
    const decode = new Promise((resolve, reject)=>{
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: 'El Token ha expirado',
                    cod: 0
                })
            }
            resolve({payload:payload.sub, cod:1})
        } catch(err){
            reject({
                status: 500,
                message: err.message,
                cod: 0
            })
        }
    })
    return decode
}

module.exports = {
    createToken,
    decodeToken
}