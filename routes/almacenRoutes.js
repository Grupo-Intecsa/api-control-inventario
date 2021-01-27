const express = require('express')
const router = express.Router()

const { AlmacenValidators } = require('../validators')
const { AlmacenController } = require('../controllers');
// const { verifyToken } =require('../context/authContext')

// midlewwares
router.use(express.urlencoded({ extended: true }));
router.use(express.json({ extended: true }));

// Añadir un producto
router.post('/api/v1/add', /*verifyToken*/ AlmacenController.create)

// insert Many
router.post('/api/v1/docs', AlmacenController.insertMany)

// Todos los productos
router.get('/api/v1/productos', /*verifyToken*/ AlmacenController.getAllProdutos)

//  query Text Mongoose
router.get('/api/v1/search', AlmacenController.findByQueryText)


module.exports = router