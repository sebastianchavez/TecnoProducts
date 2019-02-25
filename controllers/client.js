const Client = require('../models/client')

const getClients = (req, res) => {
    Client.find((err, client)=>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion, error ${err}`})
        if(!client) return res.status(404).send({message: `No existen clientes`})
        return res.status(200).json(client)
    })
}

const getClient = (req, res) => {
    let id = req.params.id

    Client.findById(id, (err, client)=>{
        if(err) return res.status(500).send({message: `Error  al realizar peticion, error: ${err}`})
        if(!client) return res.status(404).send({message: `No existe cliente`})

        return res.status(200).json(client)
    })
}
const getClientByRut = (req, res) => {
    let rut = req.params.rut
    Client.findOne({rut}, (err, client)=>{
        if(err) return res.status(500).send({message: `Error  al realizar peticion, error: ${err}`})
        if(!client) return res.status(404).send({message: `No existe cliente`, cod:0})

        return res.status(200).json(client)
    })
}

const saveClient = (req, res) => {
    Client.findOne({rut: req.body.rut},(err, client)=>{
        if(err) res.status(500).send({message: `Error : ${err}`})
        if(!client) {
            let newClient = new Client()
            newClient.rut = req.body.rut
            newClient.dv = req.body.dv
            newClient.name = req.body.name
            newClient.contact = req.body.contact
            newClient.direction = req.body.direction
            newClient.commune = req.body.commune
            newClient.region = req.body.region
        
            newClient.save((err, client)=>{
                if (err) res.status(500).send({message:`Error al salvar en la base de datos, error: ${err}`})
                res.status(200).send({client,message:'Cliente guardado con éxito'})
            })
        } else {
            res.status(404).send({message: 'Ya existe cliente'})
        }
    })
    
}

const updateClient = (req, res) => {
    let id = req.params.id
    let body = req.body
    Client.findByIdAndUpdate(id,body, (err,client) =>{
        if(err) res.status(500).send({message: `Error al actualizar cliente, error: ${err}`})
        res.status(200).json(client)
    })
}

const deleteClient = (req, res) => {
    let rut = req.params.rut

    Client.findOne({rut}, (err, client)=>{
        if(err) res.status(500).send({message: `Error  al borrar cliente, error: ${err}`})
        if(!client) res.status(404).send({message: `Cliente no existe`})
        client.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar cliente, error: ${err}`})
            res.status(200).send({message: `El cliente se ha eliminado`})
        })
    })
}

module.exports = {
   getClients,
   getClient,
   getClientByRut,
   saveClient,
   updateClient,
   deleteClient
}