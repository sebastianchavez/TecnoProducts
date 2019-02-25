const Expense = require('../models/expense')

const getExpenseById = (req,res) =>{
    let id = req.params.id
    Expense.findById(id,(err,expense)=>{
        if(err) return res.status(500).send({message:`Error al realizar peticion, error: ${err}`})
        if(!expense) return res.status(404).send({message: `No existe gasto solicitado`})
        return res.status(200).json(expense)
    })
}

const getExpenseByCod = (req,res) =>{
    let cod = req.params.cod
    Expense.findOne({cod},(err,expense)=>{
        if(err) return res.status(500).send({message:`Error al realizar peticion, error: ${err}`})
        if(!expense) return res.status(404).send({message: `No existe gasto solicitado`})
        return res.status(200).json(expense)
    })
}

const getExpensesByRut = (req,res) =>{
    let rut = req.params.rut
    Expense.find({rut},(err,expense)=>{
        if(err) return res.status(500).send({message:`Error al realizar peticion, error: ${err}`})
        if(!expense) return res.status(404).send({message:`No existen gastos asociados al rut`})
        return res.status(200).json(expense)
    })
}

const saveExpense = (req,res) =>{
    let expense = new Expense()
    expense.cod = req.body.cod
    expense.rut = req.body.rut
    expense.dv = req.body.dv
    expense.name = req.body.name
    expense.category = req.body.category
    expense.description = req.body.description
    expense.price = req.body.price
    expense.addDate = req.body.addDate
    expense.save((err,expenseStore)=>{
        if(err) res.status(500).send({message:`Error al salvar en la base de datos, error: ${err}`})
        res.status(200).send({expense:expenseStore})
    })
}

const updateExpense = (req,res) =>{
    let expenseId = req.params.id
    let body = req.body
    Expense.findByIdAndUpdate(expenseId,body, (err,expense) =>{
        if(err) res.status(500).send({message: `Error al actualizar gasto: ${err}`})
        res.status(200).send({expense})
    })
}

const deleteExpense = (req,res) =>{
    let expenseId = req.params.id
    Expense.findById(expenseId, (err, expense)=>{
        if(err) res.status(500).send({message: `Error al borrar gasto, error: ${err}`})
        if(!expense) res.status(404).send({message: `El gasto no existe`})
        expense.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar gasto, error: ${err}`})
            res.status(200).send({message: `El gasto se ha eliminado`})
        })
    })
}

module.exports = {
    getExpenseById,
    getExpenseByCod,
    getExpensesByRut,
    saveExpense,
    updateExpense,
    deleteExpense
}