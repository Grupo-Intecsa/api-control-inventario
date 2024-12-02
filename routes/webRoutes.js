const express = require("express");
const router = express.Router();

const { MessageController } = require("../controllers");
const { imageStorage } = require("../util/imageStorage");

// twilio
router.post("/api/v1/whatsapp", MessageController.whatspapp);
router.post("/api/v1/email", MessageController.email);

// monday
router.post("/api/v1/monday/create", MessageController.createItemOnBoard);
router.post("/api/v1/monday/getboard", MessageController.getBoard);

// pdf
router.post("/api/v1/pdf", MessageController.createInvoice);
router.post("/api/v1/save-pdf", MessageController.saveInvoice);
router.get("/api/v1/invoice/:folio", MessageController.getInvoiceId);

// MackbettySchema
router.post("/api/v1/mcbetty/codigo100", MessageController.createCodigoCien);
router.get("/api/v1/mcbetty/ultimos", MessageController.ultimos);

// TODO router.get('/api/v1/mcbetty/find/:autor', MessageController.findByAutor)
router.get("/api/v1/mcbetty/find", MessageController.findByTextDescription);

// TIPO DE CAMBIO MEXICO DOLAR
router.get("/api/v1/tipodecambiodolar/", MessageController.getDolarCurrency);

// Counter xml test nodo
router.post("/api/v1/counter/agent", MessageController.postCounterAgent);

// UPLOAD FILE
router.post(
  "/api/v1/storage/upload",
  [imageStorage.single("bucket")],
  MessageController.uploadFile
);

// FLOTILLA FOLDER
router.post(
  "/api/v1/flotilla/storage/upload                                                                                                                                                   ",
  [imageStorage.single("bucket")],
  MessageController.uploadFile
);

// TODOS LOS FOLIOS POR EMPRESA Y TIPO
router.get("/api/v1/folios/:empresa/", MessageController.getFolios);

// Paqueteria
router.post("/api/v1/paqueteria", MessageController.paqueteria);

module.exports = router;
