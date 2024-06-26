const express = require('express')
const router = express.Router()

const { FamiliasController } = require('../controllers')

// Insert Many
router.post('/api/v1/familia/insertall', FamiliasController.insertMany)

// All ProductoFamilia
// router.get('/api/v1/familia', FamiliasController.getAllProdutos)

router.get('/api/v1/familia', FamiliasController.getFamiliaByTitleId)


router.get('/api/v1/price', FamiliasController.getMLPrice)


module.exports = router 