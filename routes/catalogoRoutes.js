const express = require('express')
const router = express.Router()

const { CatalogoController } = require('../controllers')

// CRUD DE BRAND
router.post('/api/v1/brand/create', CatalogoController.createBrand)


// CUD DE LABEL
router.post('/api/v1/labels/create', CatalogoController.createLabel)
router.get('/api/v1/labels', CatalogoController.getAllLabels)


// CRUD DE PRODUCTOS 

router.post('/api/v1/catalog/create', CatalogoController.create)
router.get('/api/v1/catalog/products', CatalogoController.getAllProducts)



module.exports = router