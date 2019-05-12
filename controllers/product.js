const Product = require('../models/product')

const getProduct = (req, res) => {
    try {
        let productId = req.params.productId

        Product.findById(productId, (err, product) => {
            if (err) return res.status(500).send({ message: `Error  al realizar peticion error: ${err}` })
            if (!product) return res.status(404).send({ message: `El producto no existe` })
            return res.status(200).send({ product })
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const getProductByRut = (req, res) => {
    try {
        let rutEmp = req.params.rut
        Product.find({ rutEmp }, (err, product) => {
            if (err) return res.status(500).send({ message: `Error al realizar la petición, error: ${err}` })
            if (!product) return res.status(404).send({ message: `Producto no encontrado` })
            return res.status(200).json(product)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const getProductByCod = (req, res) => {
    try {
        let cod = req.params.cod
        let rutEmp = req.params.rut
        Product.findOne({ cod, rutEmp }, (err, product) => {
            if (err) return res.status(500).send({ message: `Error al realizar la petición, Error: ${err}` })
            if (!product) return res.status(404).send({ message: `Producto no encontrado` })
            return res.status(200).json(product)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const getProducts = (req, res) => {
    try {
        Product.find((err, product) => {
            if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
            if (!product) return res.status(404).send({ message: `No existen productos` })
            return res.status(200).json(product)
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }

}

const saveProduct = (req, res) => {
    try {
        let product = new Product()
        product.rutEmp = req.body.rutEmp
        product.dvEmp = req.body.dvEmp
        product.sucursal = req.body.sucursal
        product.cod = req.body.cod
        product.name = req.body.name
        product.picture = req.body.picture
        product.cost = req.body.cost
        product.price = req.body.price
        product.stock = req.body.stock
        product.category = req.body.category
        product.description = req.body.description
        product.addDate = req.body.addDate
        product.save((err, productStore) => {
            if (err) res.status(500).send({ message: `Error al salvar en la base de datos error: ${err}` })
            res.status(200).send({ product: productStore })
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const updateProduct = (req, res) => {
    try {
        let productId = req.params.productId
        let body = req.body
        Product.findByIdAndUpdate(productId, body, (err, product) => {
            if (err) res.status(500).send({ message: `Error al actualizar producto: ${product}` })
            res.status(200).send({ product })
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}

const deleteProduct = (req, res) => {
    try {
        let productId = req.params.productId
        Product.findById(productId, (err, product) => {
            if (err) res.status(500).send({ message: `Error  al borrar el producto error: ${err}` })
            if (!product) res.status(404).send({ message: `El producto no existe` })
            product.remove(err => {
                if (err) res.status(500).send({ message: `Error al borrar producto error: ${err}` })
                res.status(200).send({ message: `El producto se ha eliminado` })
            })
        })
    } catch (ex) {
        return res.status(500).send({ message: `Ha ocurrido un error, error: ${ex.message}` })
    }
}


module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
    getProductByRut,
    getProductByCod
}