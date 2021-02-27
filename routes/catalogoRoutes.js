const express = require('express')
const router = express.Router()

const { CatalogoController } = require('../controllers')

// CRUD DE BRAND
router.post('/api/v1/brand/create', CatalogoController.createBrand)
router.get('/api/v1/brands', CatalogoController.getAllBrands)


// CUD DE LABEL
router.post('/api/v1/labels/create', CatalogoController.createLabel)
router.get('/api/v1/labels', CatalogoController.getAllLabels)


// CRUD DE PRODUCTOS 

router.post('/api/v1/catalog/create', CatalogoController.create)
router.get('/api/v1/catalog/products', CatalogoController.getAllProducts)

router.post('/api/v1/catalog/insertall', CatalogoController.insertMany)



module.exports = router