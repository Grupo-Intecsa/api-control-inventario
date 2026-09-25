const express = require('express')
const router = express.Router()

const { ChecaController } = require('../controllers')

router.post('/api/v1/checa/create/employee',ChecaController.createEmployeeChecaApp)
router.post('/api/v1/checa/employee/register',ChecaController.registerEmployeeChecaApp)
router.post('/api/v1/checa/add-allowed-site',ChecaController.addAllowedSite)

router.get('/api/v1/checa/last-registers',ChecaController.getLastRegisters)
router.get('/api/v1/checa/all-employees',ChecaController.getAllEmployees)
router.post('/api/v1/checa/reporter',ChecaController.reporter)

module.exports = router 
