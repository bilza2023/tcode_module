const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false,
    default : ""
  },
  tags : {
      type: [String],
    required: false,
    default : []
  }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = {Member , memberSchema};
