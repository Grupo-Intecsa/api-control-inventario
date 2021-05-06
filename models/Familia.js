const mongoose = require('mongoose');
const { Schema } = mongoose

const FamiliaSchema = new Schema({
    isActive: {
        type: Boolean,
        default: true,
        required: false
    },
    parent: [{
        parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catalogos'
        }
    }],
    familia: {
        type: String,
        default: null,
        require: false
    },
    precio: {
        type: Number,
        default: 0,
        required: false
    },
    compatible: {
        type: Array,
        require: false
    },
    capacidad:{
        type: String,
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
    inglesDesc: {
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
    }
}, { timestamps: true })

const Familia = mongoose.model('Familia', FamiliaSchema )

module.exports = {
    Familia
}