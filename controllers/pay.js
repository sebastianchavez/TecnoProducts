const Pay = require('../models/pay')

const getByRut = (req,res) => {
    let rutEmp = req.params.rut
    Pay.find({rutEmp},(err, pay) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición, error: ${err}`})
        if(!pay) return res.status(404).send({message: `No existe pago`})
        return res.status(200).json(pay)
    })
}

const getByCodRut = (req,res) => {
    let cod = req.params.cod
    Pay.find({codPay: cod[0], rutEmp: cod[1]},(err, pay) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición, error: ${err}`})
        if(!pay) return res.status(404).send({message: `No existe pago`})
        return res.status(200).json(pay)
    })
}

const savePay = (req,res) => {
    let pay = new Pay()
    pay.rutEmp = req.body.rutEmp
    pay.codPay = req.body.codPay
    pay.idPay = req.body.idPay
    pay.name = req.body.name
    pay.price = req.body.price
    pay.datePay = req.body.datePay
    pay.date = req.body.date
    pay.save((err, payStore) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición, error: ${err}`})
        return res.status(200).json({pay:payStore})
    })
}

const updatePay = (req,res) => {
    let id = req.params.id
    Pay.findByIdAndUpdate(id,req.body,(err,pay)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición, error: ${err}`})
        if(!pay) return res.status(404).send({message: `No existe pago`})
        return res.status(200).json({pay})
    })
}

const deletePay = (req,res) => {
    let id = req.params.id
    Pay.findByIdAndDelete(id,(err,pay) =>{
        if(err) return res.status(500).send({message: `Error al realizar la petición, error: ${err}`})
        if(!pay) return res.status(404).send({message: `No existe pago`})
        return releaseEvents.status(200).json({pay})
    })
}

module.exports = {
    getByRut,
    getByCodRut,
    savePay,
    updatePay,
    deletePay
}