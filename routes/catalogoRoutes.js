const express = require('express')
const router = express.Router()

const { CatalogoController } = require('../controllers')

const { verifyToken } = require('../middlewares/authUser');

// CRUD DE BRAND
router.post('/api/v1/brand/create', CatalogoController.createBrand)
router.get('/api/v1/brands', CatalogoController.getAllBrands)
router.get('/api/v1/brands/:id', CatalogoController.findBrandAndGetDataById)


// CUD DE LABEL
router.post('/api/v1/labels/create', CatalogoController.createLabel)
router.get('/api/v1/labels', CatalogoController.getAllLabels)
router.get('/api/v1/labels/:id', CatalogoController.findLabelsAndGetDataById)


// CRUD DE PRODUCTOS 

// ruta para productos de inicio 
router.get('/api/v1/catalog/sample', CatalogoController.sample)
router.get('/api/v1/catalog/products', CatalogoController.getAllProducts)
router.get('/api/v1/catalog/product/:id', CatalogoController.getByModel)

// router.post('/api/v1/catalog/insertall', CatalogoController.insertMany)
router.post('/api/v1/catalog/create', CatalogoController.create)


//  query Text Mongoose
router.get('/api/v1/catalog/search', CatalogoController.findByQueryText)

module.exports = router