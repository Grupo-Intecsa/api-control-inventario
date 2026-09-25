const mongoose = require('mongoose')
const { Schema } = mongoose

const checaSitesSchema = new Schema({
  site: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  }
 },{
  timestamps: true
})

const ChecaSites = mongoose.model('ChecaSites', checaSitesSchema)
module.exports = {
  ChecaSites
}
