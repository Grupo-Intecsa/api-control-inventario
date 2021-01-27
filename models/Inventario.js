const mongoose = require('mongoose');
const { Schema } = mongoose


const InventarioSchema = new Schema({
    is_active: {
        type: Boolean,
        default: true
    },
    ean: {
        type: String,
        unique: true,
        required: false,
    },
    alterno: {
        type: String,
        required: false,
    },
    nombre: {
        type: String,
        required: false,
    },
    // propiedades no obligatorias
    inventario: {
        type: String,
        required: false,
    },
    ubicacion: {
        type: String,
        required: false,
    },
    almacen: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: false,
    }

}, { timestamps: true })

const Inventarios = mongoose.model('Inventarios', InventarioSchema)

module.exports = {
    Inventarios
}