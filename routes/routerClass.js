require('dotenv').config();
const auth = require('../middleware/auth');

const appConfig = require("../common/appConfig");

const express = require('express');
const routerClass = express.Router();
// const Result = require("../models/result");
// const Tag = require("../models/tag");
const ClassObj = require("../models/class");
/////////////////////////////////////////////////
////////-----------------SAVE---------/////////
routerClass.use(auth);
////////////////////////////////////////////////

routerClass.post('/save', async (req, res) => {
// console.log("ok");
// return res.status(200).json({success: true });
  try {
  // debugger;
  const user= req.user; 
  const userId  = user._id;
  const incommin_class = req.body.classObj;
      incommin_class.userId = userId;
      let classObj = new ClassObj(incommin_class);
      await classObj.save();
      res.status(200).json({ success: true, msg: 'Class saved successfully' });
    // }
  } catch (err) {
    // console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});

routerClass.get('/all', async (req, res) => {
// console.log("ok");
// return res.status(200).json({success: true });
  try {
  // debugger;
  const user= req.user; //no user since its by member
  const userId  = user._id;
 
      let classObjs =  await ClassObj.find({userId });
      res.status(200).json({ success: true, msg: 'Student saved successfully',classObjs });
    // }
  } catch (err) {
    // console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});



////////////////////////////////////////////////////////
module.exports = routerClass;





