'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const stockCtrl = require('../controllers/stock')
const expenseCtrl = require('../controllers/expense')
const userCtrl = require('../controllers/user')
const companyCtrl = require('../controllers/company')
const saleCtrl = require('../controllers/sale')
const saleDetailCtrl = require('../controllers/sale-detail')
const ClientCtrl = require('../controllers/client')
const PayCtrl = require('../controllers/pay')
const LogErrorCtrl = require('../controllers/log-error')
const auth = require('../middlewares/auth')
const api = express.Router()

//Products
api.get('/product', auth, productCtrl.getProducts)
api.get('/product/:productId', auth,productCtrl.getProduct)
api.get('/products/:rut', auth, productCtrl.getProductByRut)
api.get('/productCod/:cod', auth, productCtrl.getProductByCod)
api.post('/product', auth ,productCtrl.saveProduct)
api.put('/product/:productId', auth, productCtrl.updateProduct)
api.delete('/product/:productId', auth, productCtrl.deleteProduct)

//Stock
api.get('/stock',auth, stockCtrl.getAllStock)
api.get('/stock/:rut',auth, stockCtrl.getAllStockByRut)
api.post('/stock', auth, stockCtrl.saveStock)
api.put('/stock/:id', auth, stockCtrl.updateStock)
api.delete('/stock/:id', auth, stockCtrl.deleteStock)

//Expenses
api.get('/expenseById/:id', auth, expenseCtrl.getExpenseById)
api.get('/expense/:cod', auth, expenseCtrl.getExpenseByCod)
api.get('/expenses/:rut', auth, expenseCtrl.getExpensesByRut)
api.post('/expense', auth, expenseCtrl.saveExpense)
api.put('/expense/:id', auth, expenseCtrl.updateExpense)
api.delete('/expense/:id', auth, expenseCtrl.deleteExpense)

//Users
api.get('/users',auth,userCtrl.getUsers)
api.get('/user/:rut', auth, userCtrl.getUserByRut)
api.get('/users/:id', auth, userCtrl.getUserById)
api.get('/usersRutEmp/:rutEmp', auth, userCtrl.getUserByRutEmp)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

//Companies
api.get('/companies',companyCtrl.getCompanies)
api.get('/company/:companyId',companyCtrl.getCompany)
api.get('/companies/:rut', companyCtrl.getCompanyByRut)
api.post('/company/register',companyCtrl.saveCompany)
api.put('/company/:companyId',companyCtrl.updateCompany)
api.delete('/company/:companyId',companyCtrl.deleteCompany)

//Sale
api.get('/sales/getall/',auth,saleCtrl.getSales)
api.get('/saleId/:id',auth,saleCtrl.getSaleById)
api.get('/saleRut/:rut',auth,saleCtrl.getSalesByRut)
api.get('/saleCodRut/:cod',auth, saleCtrl.getSaleByCodRut)
api.get('/lastSale/:rut',auth, saleCtrl.getLastSaleRut)
api.post('/sale',saleCtrl.saveSale)
api.put('/sale/:id',auth,saleCtrl.updateSale)
api.delete('/sale/:id',auth,saleCtrl.deleteSale)

//SaleDetail
api.get('/saleDetailId/',auth,saleDetailCtrl.getSaleDetailById)
api.get('/saleDetailCodRut/:cod',auth,saleDetailCtrl.getSaleDetailByCodRut)
api.post('/saleDetail',saleDetailCtrl.saveSaleDetail)
api.put('/saleDetail/:id',auth,saleDetailCtrl.updateSaleDetail)
api.delete('/saleDetail/:id',auth,saleDetailCtrl.deleteSaleDetail)

//Client
api.get('/clients',auth, ClientCtrl.getClients)
api.get('/clients/:id',auth, ClientCtrl.getClient)
api.get('/client/:rut',auth, ClientCtrl.getClientByRut)
api.post('/client',auth, ClientCtrl.saveClient)
api.put('/client/:id',auth, ClientCtrl.updateClient)
api.delete('/client/:rut',auth, ClientCtrl.deleteClient)

//Pay
api.get('/pays/:rut', auth, PayCtrl.getByRut)
api.get('/pay/:cod',auth, PayCtrl.getByCodRut)
api.post('/pay',auth,PayCtrl.savePay)
api.put('/pay/:id',auth,PayCtrl.updatePay)
api.delete('/pay/:id',auth,PayCtrl.deletePay)

//Log Error
api.post('/log/error', LogErrorCtrl.saveLogError)

api.get('/public', (req, res)=>{
    res.status(200).json({message: 'Hello World public'})
})

api.get('/private',auth, (req, res)=>{
    res.status(200).json({message: 'Hello World private'})
})

//validate token
api.get('/private',auth,(req, res)=>{
    res.status(200).send({message: `Tienes acceso`, cod: 1})
})

module.exports = api