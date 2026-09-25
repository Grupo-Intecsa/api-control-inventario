const express = require('express');
const router = express.Router();

const { ControlVHController } = require('../controllers');

router.post('/api/v1/controlvh/create/vehicleExit', ControlVHController.createVehicleExit);
router.get('/api/v1/controlvh/last-registers', ControlVHController.getLastRegisters);
router.get('/api/v1/controlvh/all-registers', ControlVHController.getAllRegisters);
// router.post('/api/v1/controlvh/reporter', ControlVHController.reporter);

module.exports = router;

