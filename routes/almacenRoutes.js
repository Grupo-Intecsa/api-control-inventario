const express = require('express')
const router = express.Router()

// const { AlmacenValidators } = require('../validators')
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

// search by ean
router.get('/api/v1/ean/:ean', AlmacenController.findByEan)

// search by alterno
router.get('/api/v1/alterno/:alterno', AlmacenController.findByAlterno)

// actualizar documento
router.patch('/api/v1/update/:_id', AlmacenController.findByIdAndUpdate)

// buscar con ObjectId del modelo
router.get('/api/v1/producto/:_id', AlmacenController.findById)


module.exports = router