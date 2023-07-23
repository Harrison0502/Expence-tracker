const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String, 
    required: true 
  },
  date: {
    type: Date,
    required: true 
  },
  category: {
    type: String, 
    required: true 
  },
  price: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Record', recordSchema)