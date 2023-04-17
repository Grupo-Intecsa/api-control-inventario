const mongoose = require('mongoose');
const { Schema } = mongoose

const UsuariosEquiposSchema = new Schema({
    is_active: {
        type: Boolean,
        default: true
    },
    nombre: {
        type: String,
        required: true,
    },
    responsiva: {
        type: String        
    },
    unidad: {
        type: Object,
        required: true,
    }
}, { timestamps: true })

const UsuariosEquipos = mongoose.model('UsuariosEquipos', UsuariosEquiposSchema)

module.exports = {
    UsuariosEquipos
}