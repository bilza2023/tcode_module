const mongoose = require('mongoose');
const {tagSchema} = require("../systemTest/TestData");


const Schema = mongoose.Schema;

const studentSchema = new Schema({
  id: { //registeration number
    type: Number,
    required: true
  },
  classId: { //registeration number
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  email: { 
    type: String,
    required: false
  },
  //this will be used later when one student can have more than oner class.
  classes: { 
    type: [String],
    required: false,
    default : []
  },
  //--used since for now one student can have just one class
  classId: { 
    type: String,
    required: false,
    default : ''
  },
  password: {
    type: String,
    required: false,
    default : ""
  },
  description: {
    type: String,
    required: false
  },
  tags : { 
      type: [tagSchema],
    required: false,
    default : []
  },
  userId: {
    type: String,
    required: true
  }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;