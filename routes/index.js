const express = require('express');
const router = express.Router();
const { errors } = require('celebrate');


router.use(require('./almacenRoutes'))
router.use(require('./webRoutes'))
router.use(require('./catalogoRoutes'))


router.use(errors())
module.exports = router