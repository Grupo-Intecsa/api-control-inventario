const express = require('express')
const router = express.Router()
const { InventarioITController } = require('../controllers')

// añadir equipo a inventario
router.post('/api/v1/inventarioIT/add', InventarioITController.postAddEquipo)
router.get('/api/v1/inventarioIT/get', InventarioITController.getEquipos)
// buscar equipo
router.get('/api/v1/inventarioIT/find', InventarioITController.findEquipo)


// asignar equipo a usuario
router.post('/api/v1/inventarioIT/assign', InventarioITController.postAssignEquipo)

// añadir entrada de mantenimiento
router.post('/api/v1/inventarioIT/addmant', InventarioITController.postAddMant)


// // crear salida de mantenimiento
// router.post('/api/v1/inventarioIT/salidamant', InventarioITController.postSalidaMant)




module.exports = router