const mongoose = require('mongoose');
const { Schema } = mongoose

const CatalogoSchema = new Schema({
    isActive: {
        type: Boolean,
        default: true,
        required: false
    },
    isKit: {
        type: Boolean, 
        default: false,
        required: false,
    },
    familia: {
        type: String,
        default: null,
        require: false
    },
    capacidad:{
        type: Object,
        default: null,
        require: false
    },
    ml: {
        type: String,
        required: false,
        trim: true,
        default: null
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
    inglesTitle: {
        type: String,
        required: false,
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
    inglesDesc:{
        type: String,
        required: false,
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
    },
    compatible: {
        type: Array,
        required: false
    },
    precio: {
        type: Number,
        default: 0,
        required: false
    }
}, { timestamps: true })

const Catalogo = mongoose.model('Catalogo', CatalogoSchema )

module.exports = {
    Catalogo
}