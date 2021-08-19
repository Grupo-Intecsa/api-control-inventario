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

router.patch('/api/v1/catalogo/updatetask', verifyToken, CatalogoController.updateCatalogoByTaskFile)

// CRUD DE LABEL
router.post('/api/v1/labels/create', verifyToken, CatalogoController.createLabel)
router.get('/api/v1/labels/', CatalogoController.getAllLabels)
router.get('/api/v1/labels/:id', CatalogoController.getAllProductsBylabelId)

// FAMILIA
router.get('/api/v1/labels/catalogo/:id', CatalogoController.findByLabelIdCatalogo)
router.get('/api/v1/labels/familia/:id', CatalogoController.findByLabelIdFamilia)

router.get('/api/v1/brand/familia/etiqueta/:id', CatalogoController.getEtiquetaByBrandId)
router.get('/api/v1/label/familia/parent/:id', CatalogoController.getProductsByParentId)

router.patch('/api/v1/familia/updatetask', CatalogoController.updateByTaskFile)
router.post('/api/v1/familia/create', verifyToken, CatalogoController.createFamiliaItem)

// CRUD DE PRODUCTOS 

// ruta para productos de inicio 
router.get('/api/v1/catalog/sample/', CatalogoController.sample)
router.get('/api/v1/catalog/products', CatalogoController.getAllProducts)
router.get('/api/v1/catalog/product/:id', CatalogoController.getByModel)
router.patch('/api/v1/catalog/product/:id', CatalogoController.updateOneModel)

router.get('/api/v1/catalog/detalle/product/:id', CatalogoController.getCatalogByID)
router.get('/api/v1/familia/detalle/product/:id', CatalogoController.getFamiliaByID)

// una ruta para obtener en una lista de familias segun el id de la marca
router.get('/api/v1/products/brand/:id', CatalogoController.getListFamiliaByBrandId)

router.post('/api/v1/catalog/insertall', verifyToken, CatalogoController.insertMany)
router.post('/api/v1/catalog/create', verifyToken, CatalogoController.create)


//  query Text Mongoose
router.get('/api/v1/catalog/search', CatalogoController.findByQueryText)


module.exports = router