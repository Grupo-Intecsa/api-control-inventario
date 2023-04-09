const mongoose = require('mongoose');
const { Schema } = mongoose

const MantenimientoSchema = new Schema({
    is_active: {
        type: Boolean,
        default: true
    },
    descripcion: {
        type: String,
        required: true,
    }
    
}, { timestamps: true })

const Mantenimiento = mongoose.model('Mantenimiento', MantenimientoSchema)

module.exports = {
    Mantenimiento
}