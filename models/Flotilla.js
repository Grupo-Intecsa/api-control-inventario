const mongoose = require('mongoose');
const { Schema } = mongoose;

// field: 'modelo', ✅
// field: 'picture', ✅
// field: 'vehicle_type',
// field: 'placas',
// field: 'serie',
// field: 'motor',
// field: 'is_active',
// field: 'bussiness_cost',
// field: 'planes' es una vista,
// field: 'expiration_card',
// field: 'expiration_verify',
// field: 'expiration_seguro',
// field: 'seguro',
// field: 'factura_qty',

const FlotillasSchema = new Schema({
    is_active: {
      type: Boolean,
      default: true,
    },
    placas: {
      type: String,
      unique: true,
      required: true,
    },
    modelo: {
      type: String,
    }, 
    documentacion: {
      type: JSON,      
    }, 
    bussiness_cost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bussinesses',
    },
    picture: {
      type: String,      
    },
    expiration_card: {
      type: Date
    },
    expiration_verify: {
      type: Date
    },
    expiration_seguro: {
      type: Date
    },
    seguro: {
      type: String
    },
    factura_qty: {
      type: Number
    },
    serie: {
      type: String
    },
    motor: {
      type: String
    },
    vehicle_type: {
      type: String
    },    
    last_user_mod: {
      type: String,      
    },
}, { timestamps: true });

const Flotilla = mongoose.model('Flotillas', FlotillasSchema);

module.exports = {
  Flotilla,
}
