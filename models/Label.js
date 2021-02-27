const mongoose = require('mongoose');
const { Schema } = mongoose


const LabelSchema = new Schema({
    isActive: {
        type: Boolean,
        default: true,
        required: false
    },
    title: {
        type: String, 
        required: true,

    }
},{ timestamps: true })

const Label = mongoose.model('Label', LabelSchema);

module.exports = {
    Label
}
