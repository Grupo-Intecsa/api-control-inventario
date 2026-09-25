const { Schema, model } = require('mongoose')

const CounterSchema = new Schema({
  agent: {
    type: String,
    trim: true
  },
  contador: {
    type: Number,    
  }
},{ timestamps: true })

const Counter =  model('Counter', CounterSchema)

module.exports = {
  Counter
}