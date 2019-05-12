const LogError = require('../models/log-error')



const saveLogError = (req, res) => {
    try {
        let log = new LogError()
        log.component = req.body.component
        log.function = req.body.function
        log.description = req.body.description
        log.user = req.body.user
        log.date = req.body.date
        log.save((err, logError) => {
            if (err) res.status(500).send({ message: `Error al salvar en la base de datos, error: ${err}` })
            res.status(200).json({ logError })
        })
    } catch (ex) {
        return res.status(500).send({ message: `Error: ${ex.message}` })
    }
}



module.exports = {
    saveLogError
}