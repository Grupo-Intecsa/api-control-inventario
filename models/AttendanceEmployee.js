const mongoose = require('mongoose')
const { Schema } = mongoose

const attendanceSchema = new Schema({
  qrCode: {
    type: String,
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  device: {
    type: String,
    required: true
  },
},{
  timestamps: true
})

const AttendanceEmployee = mongoose.model('AttendanceEmployee', attendanceSchema)

module.exports = {
  AttendanceEmployee
}
