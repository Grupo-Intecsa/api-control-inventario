const express = require('express')
const router = express.Router()

const { MessageController } = require('../controllers')

// twilio
router.post('/api/v1/whatsapp', MessageController.whatspapp)
router.post('/api/v1/email', MessageController.email)

// monday
router.post('/api/v1/monday/create', MessageController.createItemOnBoard)
router.post('/api/v1/monday/getboard', MessageController.getBoard)

// pdf
router.post('/api/v1/pdf', MessageController.createInvoice)
router.post('/api/v1/save-pdf', MessageController.saveInvoice)
router.get('/api/v1/invoice/:folio', MessageController.getInvoiceId)


// MackbettySchema
router.post('/api/v1/mcbetty/codigo100', MessageController.createCodigoCien)
router.get('/api/v1/mcbetty/find/:autor', MessageController.findByAutor)
router.get('/api/v1/mcbetty/find', MessageController.findByTextDescription)

module.exports = router