const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChitsSchema = new Schema({
  chitNumber: {
    type: String,
    required: true,
    minlenght: 4,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
    minlenght: 4,
    trim: true,
  },
  endDate: {
    type: Date,
    required: true,
    trim: true,
  },
  amount: {
    type: String,
    trim: true,
  },
  no_of_persons: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model('chits', ChitsSchema);
