const mongoose = require('mongoose');
const { Schema } = mongoose

const InventarioITSchema = new Schema({
    is_active: {
        type: Boolean,
        default: true
    },
    ean: {
        type: String,
        unique: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    serie: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: false,
    },
    usuariosequipos: [{
        type: Schema.Types.ObjectId,
        ref: 'UsuariosEquipos',
    }],
    ubicacion: {
        type: String,
        required: false,
    },
    garantia: {
        type: String,
        required: false,
    },
    fechaCompra: {
        type: String,
        required: false,
    },
    precio: {
        type: String,
        required: false,
    },
    mantenimiento: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Mantenimiento',
      }
    ],
    descripcion: {
        type: Object,
        required: false,
    },
    mac: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
        enum: ['PC', 'Laptop', 'Impresora', 'Monitor', 'Otro']
    }


}, { timestamps: true })


const InventarioIT = mongoose.model('InventarioIT', InventarioITSchema)

module.exports = {
    InventarioIT
}