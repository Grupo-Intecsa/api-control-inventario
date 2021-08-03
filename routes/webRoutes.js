const express = require('express')
const router = express.Router()

const { MessageController, FirebaseController } = require('../controllers')

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

// firebase
router.get('/api/v1/login/auth', (req, res) => {
  console.log("hola mundo extraño")
  res.render("login.html")
})

module.exports = router