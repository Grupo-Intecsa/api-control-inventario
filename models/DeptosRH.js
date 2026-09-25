const mongoose = require('mongoose')
const { Schema } = mongoose

const DeptosRHSchema = new Schema({
  title: {
    type: String,
  }

},{
  timestamps: true
})

const DeptosRH = mongoose.model('DeptosRH', DeptosRHSchema)

module.exports = {
  DeptosRH
}