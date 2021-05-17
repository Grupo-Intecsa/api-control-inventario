const mongoose = require('mongoose')
const { Schema } = mongoose


const InvoiceStorageSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cpostal: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
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
    type: String,
    required: true
  },
  cotizar: {
    type: Boolean,
    required: false
  }


},{ timestamps: true })

const InvoiceStorage = mongoose.model('InvoiceStorage', InvoiceStorageSchema)

module.exports = {
  InvoiceStorage
}

