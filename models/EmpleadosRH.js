const mongoose = require('mongoose')
const { Schema } = mongoose

const EmpeladosSchemaRH = new Schema({
  isActive: {
    type: Boolean,
    default: true,
    required: false
  },
  nombre: {
    type: String,
  },
  centro_trabajo: {
    type: String,
  },
  patron: {
    type: String,
  },
  area: {
    type: String,
  },

},{
  timestamps: true
})

const EmpleadosRH = mongoose.model('EmpeladosRH', EmpeladosSchemaRH)

module.exports = {
  EmpleadosRH
}