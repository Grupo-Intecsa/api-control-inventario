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


module.exports = router