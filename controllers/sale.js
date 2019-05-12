const Sale = require('../models/sale')

const getSaleById = (req, res) => {
    try {
        let id = req.params.id
        Sale.findById(id, (err, sale) => {
            if (err) return res.status(500).send({ message: `Error al realizar peticion, error: ${err}` })
            if (!sale) return res.status(404).send({ message: `Venta no existe` })

            return res.status(200).json(sale)
        })
    } catch (ex) {
        return res.state(500).send({ message: `Error :${ex.message}` })
    }
}

const getSalesByRut = (req, res) => {
    try {
        let rutEmp = req.params.rut
        Sale.find({ rutEmp }, (err, sale) => {
            if (err) return res.status(500).send({ message: `Error al realizar la petición, error: ${err}` })
            if (!sale) return res.status(404).send({ message: `Venta no encontrada` })
            return res.status(200).json(sale)
        })
    } catch (ex) {
        return res.state(500).send({ message: `Errpr: ${ex.message}` })
    }
}

const getLastSaleRut = (req, res) => {
    try {
        let rutEmp = req.params.rut
        Sale.find({ rutEmp }, (err, sale) => {
            if (err) return res.status(500).send({ message: `Error al realizar la petición, Error: ${err}` })
            if (!sale) return res.status(404).send({ message: `Venta no encontrada` })
            let last
            if (sale.length > 1) {
                sale.map((val, ind, arr) => {
                    last = val
                })
            } else {
                last = sale
            }
            return res.status(200).json(last)
        })
    } catch (ex) {
        return res.state(500).send({ message: `Errpr: ${ex.message}` })
    }
}

const getSaleByCodRut = (req, res) => {
    try {
        let cod = req.params.cod.split(',')
        Sale.findOne({ cod: cod[0], rutEmp: cod[1] }, (err, sale) => {
            if (err) return res.status(500).send({ message: `Error al realizar la petición, Error: ${err}` })
            if (!sale) return res.status(404).send({ message: `Venta no encontrada` })
            return res.status(200).json(sale)
        })
    } catch (ex) {
        return res.state(500).send({ message: `Errpr: ${ex.message}` })
    }
}

const getSales = (req, res) => {
    try {
        Sale.find((err, sale) => {
            if (err) return res.status(500).send({ message: `Error al realizar la peticion, error: ${err}` })
            if (!sale) return res.status(404).send({ message: `No existen ventas` })
            return res.status(200).json(sale)
        })
    } catch (ex) {
        return res.state(500).send({ message: `Errpr: ${ex.message}` })
    }
}

const saveSale = (req, res) => {
    try {
        let sale = new Sale()
        sale.rutEmp = req.body.rutEmp
        sale.dvEmp = req.body.dvEmp
        sale.sucursal = req.body.sucursal
        sale.codSale = req.body.codSale
        sale.type = req.body.type
        sale.date = req.body.date
        sale.client = req.body.client
        sale.total = req.body.total
        sale.state = req.body.state
        sale.save((err, saleStore) => {
            if (err) res.status(500).send({ message: `Error al salvar en la base de datos error: ${err}` })
            res.status(200).json(saleStore)
        })
    } catch (ex) {
        return res.state(500).send({ message: `Errpr: ${ex.message}` })
    }
}

const updateSale = (req, res) => {
    try {
        let id = req.params.id
        let body = req.body
        Sale.findByIdAndUpdate(id, body, (err, sale) => {
            if (err) res.status(500).send({ message: `Error al actualizar venta: ${err}` })
            res.status(200).json(sale)
        })
    } catch (ex) {
        return res.state(500).send({ message: `Errpr: ${ex.message}` })
    }
}

const deleteSale = (req, res) => {
    try {
        let id = req.params.id
        Sale.findById(id, (err, sale) => {
            if (err) res.status(500).send({ message: `Error  al borrar venta, error: ${err}` })
            if (!sale) res.status(404).send({ message: `Venta no existe` })
            sale.remove(err => {
                if (err) res.status(500).send({ message: `Error al borrar venta, error: ${err}` })
                res.status(200).send({ message: `La venta se ha eliminado` })
            })
        })
    } catch (ex) {
        return res.state(500).send({ message: `Errpr: ${ex.message}` })
    }
}


module.exports = {
    getSales,
    getSaleById,
    getSalesByRut,
    getSaleByCodRut,
    getLastSaleRut,
    saveSale,
    updateSale,
    deleteSale
}