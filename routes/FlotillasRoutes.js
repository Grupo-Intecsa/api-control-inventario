const express = require('express')
const router = express.Router()

const { FlotillasController } = require('../controllers')


router.post('/api/v1/flotilla/insert', FlotillasController.create)
router.get('/api/v1/flotilla/get', FlotillasController.get)

// vehiculos
router.post('/api/v1/flotilla/vehiculo/insert', FlotillasController.createVehiculo)
// todos los vehiculos
router.get('/api/v1/flotilla/vehicles', FlotillasController.getVehiculo)

// editar vehiculo
router.put('/api/v1/flotilla/vehiculo/update', FlotillasController.updateVehiculo)

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

// servicio para obtener los planes de una flotilla por placas
router.get('/api/v1/flotilla/planes/placas/:placas', FlotillasController.getPlanesByPlacas)

router.put('/api/v1/flotilla/update/:id', FlotillasController.update)

// and type on query
router.get('/api/v1/flotilla/get/:id', FlotillasController.getById)

// update plan de vehiculo
router.put('/api/v1/fotilla/plan/update/:_id', FlotillasController.updatePlanById)


module.exports = router