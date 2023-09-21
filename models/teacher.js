const mongoose = require('mongoose');
const {tagSchema} = require("../systemTest/TestData");


const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  email: { 
    type: String,
    required: false
  },
  //--used since for now one student can have just one class
  status: { 
    type: String,
    required: false,
    enum : ['admin', 'teacher'],
    default : 'teacher'
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

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;