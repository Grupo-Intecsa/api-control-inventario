const mongoose = require('mongoose')
const { Schema } = mongoose

const RegistrosSchemaRH = new Schema({
  date: {
    type: Date,
  },
  empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'empleadosrrhh'
  },

},{
  timestamps: true
})

const RegistrosRH = mongoose.model('RegistrosRH', RegistrosSchemaRH)

module.exports = {
  RegistrosRH
}