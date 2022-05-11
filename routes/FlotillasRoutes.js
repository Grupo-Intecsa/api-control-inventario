const express = require('express')
const router = express.Router()

const { FlotillasController } = require('../controllers')


router.post('/api/v1/flotilla/insert', FlotillasController.create)
router.get('/api/v1/flotilla/get', FlotillasController.get)

// vehiculos
router.post('/api/v1/flotilla/vehiculo/insert', FlotillasController.createVehiculo)
router.get('/api/v1/flotilla/vehicles', FlotillasController.getVehiculo)

// get empresas 
router.get('/api/v1/flotilla/empresas/get', FlotillasController.getEmpresas)

// get documents by id bussiness
router.get('/api/v1/flotilla/documentos/:idBussines', FlotillasController.getDocumentsByIdBussiness)


// save plans by flotilla
router.post('/api/v1/flotilla/plan/insert', FlotillasController.createPlan)
// get planes by flotilla id
router.get('/api/v1/flotilla/planes/:idFlotilla', FlotillasController.getPlanesByFlotilla)
//  get planes by slug flotilla
router.get('/api/v1/flotilla/planes/slug/:slug', FlotillasController.getPlanesBySlug)


// imprimir plan MODELOS RENTA, FLETE O TRASLADO
// pasar el tipo de plan
router.post('/api/v1/flotilla/plan/print/:idDocument', FlotillasController.printPlan)


module.exports = router