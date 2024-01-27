const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchasesSchema = new Schema({
tcode: { 
    type: String,
    required: true,
  },
startDate: { 
    type: Date,
    required: true,
  },
endDate: { 
    type: Date,
    required: true,
  }

});
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
  purchases: {
  type: [purchasesSchema],
  required: true,
  default : []
  },

  verificationId: { 
    type: String,
    required: false
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