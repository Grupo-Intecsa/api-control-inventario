const express = require('express')
const router = express.Router()
const multer = require('multer')
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


const upload = multer({ storage: multer.memoryStorage() })
// para subir archivos a cloudinary
router.post('/api/v1/inventarioIT/upload', upload.single('formData'), InventarioITController.postUpload)

// firebase storage
router.post('/api/v1/firebase-upload', upload.single('formData'), InventarioITController.postFirebaseUpload)


// Crear formato de salida de asignación de equipo
router.post('/api/v1/inventarioIT/responsiva', InventarioITController.createFormat)

// añadir responsiva actualizada
router.post('/api/v1/inventarioIT/addresponsiva', InventarioITController.postAddResponsiva)



module.exports = router