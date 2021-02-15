const express = require('express')
const router = express.Router()

const { MessageController } = require('../controllers')


router.post('/api/v1/whatsapp', MessageController.whatspapp)
router.post('/api/v1/email', MessageController.email)


module.exports = router