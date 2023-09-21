
require('dotenv').config();

const auth = require('../middleware/auth');

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");

const express = require('express');
const userRouter = express.Router();
const Subscriber = require("../models/subscriber");

/////////////////////////////////////////////////
////////-----------------CREATE---------/////////
userRouter.use(auth);
/////////////////////////////////////////////////

////////////////////////////////////////////////


userRouter.get('/members', async (req, res) => {
  try {
  // const id = '64202224fd8518cb214bd138';
    const user= req.user;
    const userId  = req.userId;

    const members = await Subscriber.findById(userId).select('members');
    res.json({members});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



userRouter.post('/members/save', async (req, res) => {
  try {
  // debugger;
      const user= req.user;
    const userId  = req.userId;



    const newMembers = req.body.members;
   user.members = newMembers;

    user.members = newMembers;
    await user.save();
const members = await user.members;
res.status(200).json({ msg: 'Members updated successfully' , members });
  } catch (err) {
    // console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});

////////////////////////////////////////////////////////
////////////////////////////////////////////////

module.exports = userRouter;


