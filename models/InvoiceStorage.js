const mongoose = require('mongoose')
const { Schema } = mongoose


const InvoiceStorageSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true
  },
  uuidUser:{
    type: String,
    required: true
  },
  folio: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  // direccion de facturacion
  razonsocial: {
    type: String,
    required: false
  },
  rfc: {
    type: String,
    required: false
  },
  direccionRfc: {
    type: String,
    required: false
  },
  coloniaRfc: {
    type: String,
    required: false
  },
  codigopostalRcf: {
    type: String,
    required: false
  },
  ciudadRfc: {
    type: String,
    required: false
  },
  estadoRfc: {
    type: String,
    required: false
  },
  alcaldiaRfc: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  // direccion dos Envio
  direccionEnvio: {
    type: String,
    required: false
  },
  coliniaEnvio: {
    type: String,
    required: false
  },
  postalEnvio: {
    type: String,
    required: false
  },
  ciudadEnvio: {
    type: String,
    required: false
  },  
  estadoEnvio: {
    type: String,
    required: false
  },
  alcaldiaEnvio: {
    type: String,
    required: false
  },
  carrito: {
    type: Array,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },

},{ timestamps: true })

const InvoiceStorage = mongoose.model('InvoiceStorage', InvoiceStorageSchema)

module.exports = {
  InvoiceStorage
}

