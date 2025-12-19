// portfolio-backend/models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied', 'archived'],
    default: 'unread'
  },
  ipAddress: String,
  userAgent: String,
  jwtToken: {
    type: String,
    required: true,
    unique: true // unique automatically creates an index
  },
  tokenExpires: {
    type: Date,
    default: function() {
      // Token expires in 1 year
      return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Note: jwtToken already has unique: true which creates an index
// Create index on email for queries
contactSchema.index({ email: 1 });

// Create index on createdAt for sorting
contactSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);