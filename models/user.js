const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    enum : ['paid','unpaid'],
    required: true,
    default : 'unpaid'
  },
  registerationData: {
    type: Date,
    default: Date.now,
    required: false,
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
