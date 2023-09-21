
require('dotenv').config();
const auth = require('../middleware/auth');

const appConfig = require("../common/appConfig");

const express = require('express');
const routerStudent = express.Router();
const Student = require("../models/student");

/////////////////////////////////////////////////
////////-----------------SAVE---------/////////
routerStudent.use(auth);
////////////////////////////////////////////////

routerStudent.post('/save', async (req, res) => {
// console.log("ok");
// return res.status(200).json({success: true });
  try {
  debugger;
  const user= req.user; 
  const userId  = user._id;
  
  const incommin_student = req.body.student;
  incommin_student.userId = userId;
      let student = new Student(incommin_student);
      await student.save();
      res.status(200).json({ success: true, msg: 'Student saved successfully' });
    // }
  } catch (err) {
    // console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});

routerStudent.get('/all', async (req, res) => {
// console.log("ok");
// return res.status(200).json({success: true });
  try {
  // debugger;
  const user= req.user; //no user since its by member
  const userId  = user._id;
 
      let students =  await Student.find({userId });
      res.status(200).json({ success: true, msg: 'Student saved successfully',students });
    // }
  } catch (err) {
    // console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});

////////////////////////////////////////////////////////
module.exports = routerStudent;





