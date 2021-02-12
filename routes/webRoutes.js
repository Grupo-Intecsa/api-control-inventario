const express = require('express')
const router = express.Router()

const { MessageController } = require('../controllers')


router.post('/api/v1/message', MessageController.create)


module.exports = router