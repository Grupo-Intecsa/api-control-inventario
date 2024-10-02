const mongoose = require('mongoose')
const { Schema } = mongoose

const employeesSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true,
    required: false
  },
  name: {
    type: String,
  },
  departmen: {
    type: String,
  },
  employeeId: {    
    type: String,
    required: true,
    unique: true
  },
  qrCode: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
},{
  timestamps: true
})

employeesSchema.pre('save', function(next){
  const uniqCode = crypto.randomUUID()
  this.qrCode = uniqCode
  this.employeeId = uniqCode
  next()
})

const ChecaEmployees = mongoose.model('Employees', employeesSchema)

module.exports = {
  ChecaEmployees
}
