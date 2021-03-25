const express = require('express')
const router = express.Router()

const { CatalogoController } = require('../controllers')

const { verifyToken } = require('../middlewares/authUser');

// CRUD DE BRAND
router.post('/api/v1/brand/create', verifyToken, CatalogoController.createBrand)
router.get('/api/v1/brands/', CatalogoController.getAllBrands)

// Catalogo
router.get('/api/v1/brands/catalogo/:id', CatalogoController.findByBrandIdCatalogo)
router.get('/api/v1/brands/familia/:id', CatalogoController.findByBrandIdFamilia)

// CUD DE LABEL
router.post('/api/v1/labels/create', verifyToken, CatalogoController.createLabel)
router.get('/api/v1/labels/', CatalogoController.getAllLabels)

// FAMILIA
router.get('/api/v1/labels/catalogo/:id', CatalogoController.findByLabelIdCatalogo)
router.get('/api/v1/labels/familia/:id', CatalogoController.findByLabelIdFamilia)

// SOLO NOMBRE DE CADA FAMILIA
router.get('/api/v1/brand/familia/etiqueta/:id', CatalogoController.getEtiquetaByBrandId)

// CRUD DE PRODUCTOS 

// ruta para productos de inicio 
router.get('/api/v1/catalog/sample', CatalogoController.sample)
router.get('/api/v1/catalog/products', CatalogoController.getAllProducts)
router.get('/api/v1/catalog/product/:id', CatalogoController.getByModel)

router.post('/api/v1/catalog/insertall', verifyToken, CatalogoController.insertMany)
router.post('/api/v1/catalog/create', verifyToken, CatalogoController.create)


//  query Text Mongoose
router.get('/api/v1/catalog/search', CatalogoController.findByQueryText)

module.exports = router