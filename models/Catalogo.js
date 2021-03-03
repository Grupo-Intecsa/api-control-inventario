const mongoose = require('mongoose');
const { Schema } = mongoose


const CatalogoSchema = new Schema({
    isActive: {
        type: Boolean,
        default: true,
        required: false
    },
    textSearch: {
        type: String,
        required: false
    },
    ml: {
        type: String,
        required: false,
        trim: true
    },
    amazon: {
        type: String,
        required: false,
        default: null
    },
    sku: {
        type: String,
        required: false,
        trim: true
    },
    title: {
        type: String,
        required: true,
    },
    coduniversal: {
        type: String,
        required: false,
        trim: true
    },
    // MAarca del producto
    brand: [{
        brand_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'brand'
        }
    }],
    model: {
        type: String,
        unique: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
    },
    // las clasificaciones del producto
    label: [{
        label_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'label'
        }
    }],
    urlfoto:{
        type: Array,
        required: true,
    },
    urldata:{
        type: Array,
        required: false
    }
}, { timestamps: true })

const Catalogo = mongoose.model('Catalogo', CatalogoSchema )

module.exports = {
    Catalogo
}