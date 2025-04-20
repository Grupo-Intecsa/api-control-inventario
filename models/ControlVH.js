const mongoose = require('mongoose')

const vehicleExitSchema = new mongoose.Schema({
  conductor: { type: String, required: true },
  destino: { type: String, required: true },
  modelo: { type: String, required: true },
  placa: { type: String, required: true },
  soat: { type: String }, // podrías hacerlo tipo Date si lo deseas
  tarjetaCirculacion: { type: String },
  fechaSalida: { type: Date, required: true },
  fechaLlegada: { type: Date },
  kmSalida: { type: Number, required: true },
  kmLlegada: { type: Number },
  motivo: { type: String },
  combustibleSalida: { type: Number },
  accesorios: {
    extintor: Boolean,
    gato: Boolean,
    llaveDeRuedas: Boolean,
    herramientas: Boolean,
    triangulo: Boolean,
    botiquin: Boolean,
    espejoLateralDerecho: Boolean,
    espejoLateralIzquierdo: Boolean,
    radio: Boolean,
    antena: Boolean
  },
  carroceria: {
    puertasEstado: { type: String, enum: ['bueno', 'regular', 'malo'] },
    pinturaEstado: { type: String, enum: ['bueno', 'regular', 'malo'] },
    interioresEstado: { type: String, enum: ['bueno', 'regular', 'malo'] },
    cinturonesEstado: { type: String, enum: ['bueno', 'regular', 'malo'] }
  },
  createdAt: { type: Date, default: Date.now }
})
const VehicleExit = mongoose.model('VehicleExit', vehicleExitSchema)
module.exports = {
  VehicleExit
}

