const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanesSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true,
  },
  idSlug: {
    type: String,
  },
  planName: {
    type: String,
    required: true,
    trim: true,
  }, 
  planDescription: {
    type: String,
    required: true,
  }, 
  planPrice: {
    type: Number,
    required: true,
  },
  flotilla: {
    type: Schema.Types.ObjectId,
    ref: 'Flotillas',
    required: true,
  }
}, {
  timestamps: true
})

PlanesSchema.pre('save', function (next) {
  this.idSlug = this.planName.toLowerCase().replace(/\s/g, '-');
  next();
})

const Planes = mongoose.model('Planes', PlanesSchema);
module.exports = {
  Planes
}