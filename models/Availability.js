// models/Availability.js
const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true,
  },
  availability: [
    {
      date: {
        type: String,
        required: true,
      },
      minTime: {
        type: String,
        required: true,
      },
      maxTime: {
        type: String,
        required: true,
      },
      step: {
        type: Number,
        required: true,
      },
      breakDuration: {
        type: Number,
        required: true,
      }
    }
  ]
});

// Export the model, use 'availbility' to match your collection name
module.exports = mongoose.model('Availability', availabilitySchema, 'availbility');
