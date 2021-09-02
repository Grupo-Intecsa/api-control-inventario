const express = require('express')
const router = express.Router()

const { RHController } = require('../controllers')
// const { verifyToken } = require('../middlewares/authUser');

// Insert Empleado
router.post('/api/v1/rrhh/create-user', RHController.createEmpealdo)

// Insert Departamento
router.post('/api/v1/rrhh/new/depto', RHController.createDepto)
router.get('/api/v1/rrhh/deptos', RHController.getDeptos)


// buscar Empleado
router.get('/api/v1/rrhh/find-user', RHController.findUser)
// todos los empleados
router.get('/api/v1/rrhh/employees', RHController.getEmployees)


// crear salida
router.post('/api/v1/rrhh/salidasactive', RHController.postSalidaCheck)

// leer saldidas
router.get('/api/v1/rrhh/registrosget', RHController.getActiveRegistros)



module.exports = router 