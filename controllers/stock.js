const Stock = require('../models/stock')

const getAllStock = (req, res) => {
    try {
        Stock.find((err, stock) => {
            if (err) return res.status(500).send({ message: `Error al realizar petición, error : ${err}` })
            if (!stock) return res.status(404).send({ message: `No existe stock` })
            return res.status(200).json(stock)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}

const getAllStockByRut = (req, res) => {
    try {
        let rutEmp = req.params.rut
        Stock.find({ rutEmp }, (err, stock) => {
            if (err) return res.status(500).send({ message: `Error al realizar petición, error: ${err}` })
            if (!stock) return res.status(404).send({ message: `No existe stock` })
            return res.status(200).json(stock)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}

const saveStock = (req, res) => {
    try {
        let stock = new Stock()
        stock.rutEmp = req.body.rutEmp
        stock.codProd = req.body.codProd
        stock.dvEmp = req.body.dvEmp
        stock.sucursal = req.body.sucursal
        stock.operation = req.body.operation
        stock.amount = req.body.amount
        stock.date = req.body.date
        stock.user = req.body.user
        stock.save((err, stockStore) => {
            if (err) return res.status(500).send({ message: `Error al realizar petición: error: ${err}` })
            return res.status(200).json(stockStore)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}

const updateStock = (req, res) => {
    try {
        let id = req.params.id
        Stock.findByIdAndUpdate(id, req.body, (err, stock) => {
            if (err) return res.status(500).send({ message: `Error al realizar petición, error: ${err}` })
            if (!stock) return res.status(404).send({ message: `No existe stock` })
            return res.status(200).json(stock)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}

const deleteStock = (req, res) => {
    try {
        let id = req.params.id
        Stock.findByIdAndRemove(id, (err, stock) => {
            if (err) return res.status(500).send({ message: `Error al realizar petición, error: ${err}` })
            if (!stock) return res.status(404).send({ message: `No existe stock` })
            return res.status(200).send({ message: `Stock eliminado con exito` })
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}

module.exports = {
    getAllStock,
    getAllStockByRut,
    saveStock,
    updateStock,
    deleteStock
}