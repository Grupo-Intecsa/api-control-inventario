const mongoose = require('mongoose')
const { Schema } = mongoose

const FleteSchema = new Schema({
  is_active: {
    type: Boolean
  },
  folio: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'flete'
  },
  request_date: {
    type: Date
  },
  delivery_date: {
    type: Date
  },
  vehicle: {
    type: String
  },
  driver: {
    type: String
  },
  subject: {
    type: String
  },
  document_id: {
    type: String
  },
  project_id: {
    type: String
  },
  subtotal_travel: {
    type: String
  },
  kilometer_out: {
    type: Number
  },
  kilometer_in: {
    type: Number
  },
  fuel_level: {
    type: Number
  },
  fuel_card: {
    type: String
  },
  fuel_amount: {
    type: String
  },
  recorrido_km: {
    type: String
  },
  email_sent: {
    type: Array
  },
  bussiness_cost: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bussinesses'
  }],
  route: {
    type: JSON
  },
  description: {
    type: JSON
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'businesses'
  },
  link_googlemaps: {
    type: String
  },
  casetas: {
    type: String
  },
  tarjeta_deposito: {
    type: String
  },
  isCancel_status: {
    type: String,
    default: null
  }
}, { timestamps: true })

FleteSchema.pre('save', async function (next) {
  // count the number of traslado
  this.folio = await Flete.find({
    bussiness_cost: this.bussiness_cost
  }).countDocuments() + 1
  next()
})

// prev folio consecutive
const Flete = mongoose.model('Fletes', FleteSchema)

module.exports = {
  Flete
}
