const Sale = require('../models/sale')

const getSaleById = (req,res) =>{
    let id = req.params.id

    Sale.findById(id, (err, sale)=>{
        if(err) return res.status(500).send({message: `Error al realizar peticion, error: ${err}`})
        if(!sale) return res.status(404).send({message: `Venta no existe`})

        return res.status(200).json(sale)
    })
}

const getSalesByRut = (req, res) => {
    let rutEmp = req.params.rut
    Sale.find({rutEmp},(err, sale) =>{
        if(err) return res.status(500).send({message: `Error al realizar la petición, error: ${err}`})
        if(!sale) return res.status(404).send({message: `Venta no encontrada`})
        return res.status(200).json(sale)
    })
}

const getLastSaleRut = (req,res) =>{
    let rutEmp = req.params.rut
    Sale.find({rutEmp},(err, sale) =>{
        if(err) return res.status(500).send({message:`Error al realizar la petición, Error: ${err}`})
        if(!sale) return res.status(404).send({message: `Venta no encontrada`})
        let last
        console.log(sale)
        if(sale.length > 1){
            sale.map((val,ind,arr) =>{
                last = val
            })
        } else {
            last = sale
        }
        console.log(last)
        

        return res.status(200).json(last)
    })
}

const getSaleByCodRut = (req,res) =>{
    let cod = req.params.cod.split(',')
    Sale.findOne({cod:cod[0],rutEmp:cod[1]},(err, sale) =>{
        if(err) return res.status(500).send({message:`Error al realizar la petición, Error: ${err}`})
        if(!sale) return res.status(404).send({message: `Venta no encontrada`})
        return res.status(200).json(sale)
    })
}

const getSales = (req, res) =>{
    Sale.find((err, sale)=>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion, error: ${err}`})
        if(!sale) return res.status(404).send({message: `No existen ventas`})
        return res.status(200).json(sale)
    })
}
    
const saveSale = (req,res) => {
    let sale = new Sale()
    sale.rutEmp = req.body.rutEmp
    sale.dvEmp = req.body.dvEmp
    sale.cod = req.body.cod
    sale.type = req.body.type
    sale.date = req.body.date
    sale.client = req.body.client
    sale.total = req.body.total
    sale.state = req.body.state
    sale.save((err, saleStore)=>{
        if (err) res.status(500).send({message:`Error al salvar en la base de datos error: ${err}`})
        res.status(200).json(saleStore)
    })
}

const updateSale = (req,res) =>{
    let id = req.params.id
    let body = req.body
    Sale.findByIdAndUpdate(id,body, (err,sale) =>{
        if(err) res.status(500).send({message: `Error al actualizar venta: ${err}`})
        res.status(200).json(sale)
    })
}

const deleteSale = (req,res) =>{
    let id = req.params.id
    Sale.findById(id, (err, sale)=>{
        if(err) res.status(500).send({message: `Error  al borrar venta, error: ${err}`})
        if(!sale) res.status(404).send({message: `Venta no existe`})
        sale.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar venta, error: ${err}`})
            res.status(200).send({message: `La venta se ha eliminado`})
        })
    })
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