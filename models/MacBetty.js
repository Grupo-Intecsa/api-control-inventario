const mongoose = require('mongoose');
const { Schema } = mongoose


const MackbettySchema = new Schema({
    isActive: {
        type: Boolean,
        default: true,
        required: false
    },
    CODIGO: {
        type: String
    },
    ALTERNO: {
        type: String, 
        required: true,

    },
    AUTOR: {
        type: String, 
        required: true,

    },
    DESCRIPCION: {
        type: String, 
        required: true,

    },
    UMED: {
        type: String, 
        required: true,

    }
},{ timestamps: true })

const Mackbetty = mongoose.model('Mackbetty', MackbettySchema);

module.exports = {
  Mackbetty
}
