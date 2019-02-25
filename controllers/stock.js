const Stock = require('../models/stock')

const getAllStock = (req,res) =>{
    Stock.find((err,stock) => {
        if(err) return res.status(500).send({message: `Error al realizar petición, error : ${err}`})
        if(!stock) return res.status(404).send({message: `No existe stock`})
        return res.status(200).json(stock)
    })
}

const getAllStockByRut = (req,res) =>{
    let rutEmp = req.params.rut
    Stock.find({rutEmp},(err,stock) => {
        if(err) return res.status(500).send({message:`Error al realizar petición, error: ${err}`})
        if(!stock) return res.status(404).send({message: `No existe stock`})
        return res.status(200).json(stock)
    })
}

const saveStock = (req,res) =>{
    let stock = new Stock()
    stock.rutEmp = req.body.rutEmp
    stock.codProd = req.body.codProd
    stock.operation = req.body.operation
    stock.quantity = req.body.quantity
    stock.date = req.body.date
    stock.save((err,stockStore)=>{
        if(err) return res.status(500).send({message: `Error al realizar petición: error: ${err}`})
        return res.status(200).json(stockStore)
    })
}

const updateStock = (req,res) =>{
    let id = req.params.id
    Stock.findByIdAndUpdate(id,req.body,(err,stock) => {
        if(err) return res.status(500).send({message: `Error al realizar petición, error: ${err}`})
        if(!stock) return res.status(404).send({message: `No existe stock`})
        return res.status(200).json(stock)
    })
}

const deleteStock = (req,res) =>{
    let id = req.params.id
    Stock.findByIdAndRemove(id,(err, stock) => {
        if(err) return res.status(500).send({message: `Error al realizar petición, error: ${err}`})
        if(!stock) return res.status(404).send({message: `No existe stock`})
        return res.status(200).send({message:`Stock eliminado con exito`})
    })
}

module.exports = {
    getAllStock,
    getAllStockByRut,
    saveStock,
    updateStock,
    deleteStock
}