
require('dotenv').config();
const auth = require('../middleware/auth');

const appConfig = require("../common/appConfig");

const express = require('express');
const routerTag = express.Router();
const {Tag} = require("../models/tag");

////////////////////////////////////////////////
routerTag.use(auth);
////////////////////////////////////////////////

routerTag.post('/save', async (req, res) => {
// console.log("ok");
// return res.status(200).json({success: true });
  try {
  debugger;
  const user= req.user; 
  const userId  = user._id;
 
  const incommin_tag = req.body.tag;
      incommin_tag.userId = userId;
      let tag = new Tag(incommin_tag);
      await tag.save();
      res.status(200).json({ success: true, msg: 'Tag saved successfully' });
    // }
  } catch (err) {
    // console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});

routerTag.get('/all', async (req, res) => {
  try {
  // debugger;
  const user= req.user; //no user since its by member
  const userId  = user._id;
 
      let tags =  await Tag.find({userId });
      res.status(200).json({tags});
    // }
  } catch (err) {
    // console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});

////////////////////////////////////////////////////////
module.exports = routerTag;





