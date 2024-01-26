const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  email: { 
    type: String,
    required: false,
    unique: true
  },
  verified: { 
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: { 
    type: Date,
    required: true,
    default: Date.now
  },
  verificationId: { 
    type: String,
    required: false
  },
  status: { 
    type: String,
    required: false,
    enum : ['free', 'paid'],
    default : 'free'
  },
  password: {
    type: String,
    required: false,
    default : ""
  },
  description: {
    type: String,
    required: false
  }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;