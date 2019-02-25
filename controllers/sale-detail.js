const SaleDetail = require('../models/sale-detail')

const getSaleDetailById = (req,res) =>{
    let id = req.params.id

    SaleDetail.findById(id, (err, sale)=>{
        if(err) return res.status(500).send({message: `Error al realizar peticion, error: ${err}`})
        if(!sale) return res.status(404).send({message: `Venta no existe`})

        return res.status(200).json(sale)
    })
}


const getSaleDetailByCodRut = (req,res) =>{
    let cod = req.params.cod.split(',')
    SaleDetail.find({cod:cod[0],rutEmp:cod[1]},(err, sale) =>{
        if(err) return res.status(500).send({message:`Error al realizar la petición, Error: ${err}`})
        if(!sale) return res.status(404).send({message: `Venta no encontrada`})
        return res.status(200).json(sale)
    })
}
    
const saveSaleDetail = (req,res) => {
    let sale = new SaleDetail()
    sale.rutEmp = req.body.rutEmp
    sale.dvEmp = req.body.dvEmp
    sale.cod = req.body.cod
    sale.codProd = req.body.codProd
    sale.description = req.body.description
    sale.quantity = req.body.quantity
    sale.value = req.body.value
    sale.save((err, saleStore)=>{
        if (err) res.status(500).send({message:`Error al salvar en la base de datos, error: ${err}`})
        res.status(200).json(saleStore)
    })
}

const updateSaleDetail = (req,res) =>{
    let id = req.params.id
    let body = req.body
    SaleDetail.findByIdAndUpdate(id,body, (err,sale) =>{
        if(err) res.status(500).send({message: `Error al actualizar venta: ${err}`})
        res.status(200).json(sale)
    })
}

const deleteSaleDetail = (req,res) =>{
    let id = req.params.id
    SaleDetail.findById(id, (err, sale)=>{
        if(err) res.status(500).send({message: `Error  al borrar venta, error: ${err}`})
        if(!sale) res.status(404).send({message: `Venta no existe`})
        sale.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar venta, error: ${err}`})
            res.status(200).send({message: `La venta se ha eliminado`})
        })
    })
}


module.exports = {
    getSaleDetailById,
    getSaleDetailByCodRut,
    saveSaleDetail,
    updateSaleDetail,
    deleteSaleDetail
}