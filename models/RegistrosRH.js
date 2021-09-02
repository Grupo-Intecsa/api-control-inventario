const mongoose = require('mongoose')
const { Schema } = mongoose

const RegistrosSchemaRH = new Schema({
  isActive: {
    type: Boolean,
    default: true
  },
  empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'empleadosrhs'
  },
  nameEmployee: {
    type: String
  },
  destino: {
    type: String,
  },
  dateFinish: {
    type: Date
  }


},{
  timestamps: true
})

const RegistrosRH = mongoose.model('RegistrosRH', RegistrosSchemaRH)

module.exports = {
  RegistrosRH
}