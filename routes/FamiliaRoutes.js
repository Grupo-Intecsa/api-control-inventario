const express = require('express')
const router = express.Router()

const { FamiliasController } = require('../controllers')

// const { verifyToken } = require('../middlewares/authUser');

// CRUD DE BRAND

// Insert Many
router.post('/api/v1/familia/insertall', FamiliasController.insertMany)

// All ProductoFamilia
router.get('/api/v1/familia', FamiliasController.getAllProdutos)

module.exports = router 