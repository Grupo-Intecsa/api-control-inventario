const express = require('express');
const router = express.Router();
const { errors } = require('celebrate');


router.use(require('./almacenRoutes'))


router.use(errors())
module.exports = router