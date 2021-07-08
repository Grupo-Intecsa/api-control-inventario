const mongoose = require('mongoose');
const { Schema } = mongoose


const BrandSchema = new Schema({
    isActive: {
        type: Boolean,
        default: true,
        required: false
    },
    slug: {
        type: String,
        required: true
    },
    title: {
        type: String, 
        required: true,
    },
    img: {
        type: String,
        requiref: false
    }
},{ timestamps: true })

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = {
    Brand
}

