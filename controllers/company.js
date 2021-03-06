const Company = require('../models/company')

const getCompanies = (req, res) => {
    try {
        Company.find((err, company) => {
            if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
            if (!company) return res.status(404).send({ message: `No existen empresas` })
            return res.status(200).json(company)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const getCompany = (req, res) => {
    try {
        let companyId = req.params.companyId
        Company.findById(companyId, (err, company) => {
            if (err) return res.status(500).send({ message: `Error  al realizar peticion error: ${err}` })
            if (!company) return res.status(404).send({ message: `La empresa no existe` })
            return res.status(200).send({ company })
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}
const getCompanyByRut = (req, res) => {
    try {
        console.log('GET api/companies/:rut')
        let rut = req.params.rut
        console.log(rut)
        Company.findOne({ rut }, (err, company) => {
            if (err) return res.status(500).send({ message: `Error  al realizar peticion error: ${err}` })
            if (!company) return res.status(404).send({ message: `La empresa no existe` })

            return res.status(200).json(company)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const saveCompany = (req, res) => {
    try {
        Company.findOne({ rut: req.body.rut }, (err, company) => {
            if (err) res.status(500).send({ message: `Error : ${err}` })
            if (!company) {
                let newCompany = new Company()
                newCompany.rut = req.body.rut
                newCompany.dv = req.body.dv
                newCompany.sucursal = req.body.sucursal
                newCompany.name = req.body.name
                newCompany.contact = req.body.contact
                newCompany.direction = req.body.direction
                newCompany.email = req.body.email
                newCompany.business = req.body.business
                newCompany.active = req.body.active
                newCompany.save((err, company) => {
                    if (err) res.status(500).send({ message: `Error al salvar en la base de datos error: ${err}` })
                    res.status(200).send({ company, message: 'Empresa guardada con éxito', cod: 1 })
                })
            } else {
                res.status(404).send({ message: 'Empresa ya existe', cod: 0 })
            }
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const updateCompany = (req, res) => {
    try {
        let companyId = req.params.companyId
        let body = req.body
        Company.findByIdAndUpdate(companyId, body, (err, company) => {
            if (err) res.status(500).send({ message: `Error al actualizar empresa, error: ${err}` })
            res.status(200).send({ company })
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const deleteCompany = (req, res) => {
    try {
        let rut = req.params.rut
        Company.findOne({ rut: rut }, (err, company) => {
            if (err) res.status(500).send({ message: `Error  al borrar empresa, error: ${err}` })
            if (!company) res.status(404).send({ message: `Empresa no existe` })
            company.remove(err => {
                if (err) res.status(500).send({ message: `Error al borrar empresa, error: ${err}` })
                res.status(200).send({ message: `La empresa se ha eliminado` })
            })
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

module.exports = {
    getCompanies,
    getCompany,
    saveCompany,
    updateCompany,
    deleteCompany,
    getCompanyByRut
}