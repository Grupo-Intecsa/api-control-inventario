const mongoose = require('mongoose');
const { Schema } = mongoose

const FleteSchema = new Schema({
    is_active: {
        type: Boolean,
    },
    folio: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
        default: 'flete',
    },
    request_date: {
        type: Date,
    },
    delivery_date: {
        type: Date,
    }, 
    // vehicle: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'vehiculo',
    // }],
    vehicle: {
        type: String        
    },
    driver: {
        type: String,
    }, 
    document_id: {
        type: String,
    }, 
    project_id: {
        type: String,
    }, 
    kilometer_out: {
        type: Number,
    }, 
    kilometer_in: {
        type: Number,
    }, 
    fuel_level: {
        type: Number,
    },
    fuel_card: {
        type: String,
    }, 
    email_sent: {
        type: Array,
    }, 
    bussiness_cost: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bussinesses',
    }],
    route: {
        type: JSON,
    },
    description: {
        type: JSON,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'businesses',
    }
}, { timestamps: true })

FleteSchema.pre('save', async function (next) {
    // count the number of traslado
    this.folio = await Flete.countDocuments({}) + 1
    next()
})

// prev folio consecutive
const Flete = mongoose.model('Fletes', FleteSchema)

module.exports = {
    Flete
}