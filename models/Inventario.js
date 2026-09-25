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
        required: true,
        trim: true
    },
    alterno: {
        type: String,
        required: false,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
    },
    // propiedades no obligatorias
    inventario: {
        type: Number,
        required: false,
        trim: true
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
        trim: true
    },
    unegocio: {
        type: String,
        required: false,
        trim: true
    }

}, { timestamps: true })

const Inventarios = mongoose.model('Inventarios', InventarioSchema)

module.exports = {
    Inventarios
}