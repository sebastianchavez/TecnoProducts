const Client = require('../models/client')

const getClients = (req, res) => {
    try {
        Client.find((err, client) => {
            if (err) return res.status(500).send({ message: `Error al realizar la peticion, error ${err}` })
            if (!client) return res.status(404).send({ message: `No existen clientes` })
            return res.status(200).json(client)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}

const getClient = (req, res) => {
    try {
        let id = req.params.id
        Client.findById(id, (err, client) => {
            if (err) return res.status(500).send({ message: `Error  al realizar peticion, error: ${err}` })
            if (!client) return res.status(404).send({ message: `No existe cliente` })
            return res.status(200).json(client)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}
const getClientByRut = (req, res) => {
    try {
        let rut = req.params.rut
        Client.findOne({ rut }, (err, client) => {
            if (err) return res.status(500).send({ message: `Error  al realizar peticion, error: ${err}` })
            if (!client) return res.status(404).send({ message: `No existe cliente`, cod: 0 })
            return res.status(200).json(client)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}

const saveClient = (req, res) => {
    try {
        Client.findOne({ rut: req.body.rut }, (err, client) => {
            if (err) res.status(500).send({ message: `Error : ${err}` })
            if (!client) {
                let newClient = new Client()
                newClient.rut = req.body.rut
                newClient.dv = req.body.dv
                newClient.name = req.body.name
                newClient.contact = req.body.contact
                newClient.direction = req.body.direction
                newClient.commune = req.body.commune
                newClient.region = req.body.region
                newClient.email = req.body.email
                newClient.save((err, client) => {
                    if (err) res.status(500).send({ message: `Error al salvar en la base de datos, error: ${err}` })
                    res.status(200).send({ client, message: 'Cliente guardado con éxito' })
                })
            } else {
                res.status(404).send({ message: 'Ya existe cliente' })
            }
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}

const updateClient = (req, res) => {
    try {
        let id = req.params.id
        let body = req.body
        Client.findByIdAndUpdate(id, body, (err, client) => {
            if (err) res.status(500).send({ message: `Error al actualizar cliente, error: ${err}` })
            res.status(200).json(client)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}

const deleteClient = (req, res) => {
    try {
        let rut = req.params.rut
        Client.findOne({ rut }, (err, client) => {
            if (err) res.status(500).send({ message: `Error  al borrar cliente, error: ${err}` })
            if (!client) res.status(404).send({ message: `Cliente no existe` })
            client.remove(err => {
                if (err) res.status(500).send({ message: `Error al borrar cliente, error: ${err}` })
                res.status(200).send({ message: `El cliente se ha eliminado` })
            })
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}

module.exports = {
    getClients,
    getClient,
    getClientByRut,
    saveClient,
    updateClient,
    deleteClient
}