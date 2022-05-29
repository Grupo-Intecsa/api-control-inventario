const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    }
}, { timestamps: true });

const Flotilla = mongoose.model('Flotillas', FlotillasSchema);

module.exports = {
  Flotilla,
}
