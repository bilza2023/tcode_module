 
require('dotenv').config();
const auth = require('../middleware/auth');

const appConfig = require("../common/appConfig");

const express = require('express');
const resultRouter = express.Router();
const Result = require("../models/result");
const {Test} = require("../models/survey/survey");

const Subscriber = require("../models/subscriber.js");
/////////////////////////////////////////////////
////////-----------------SAVE---------/////////
resultRouter.use(auth);
////////////////////////////////////////////////

resultRouter.post('/save', async (req, res) => {
// console.log("ok");
// return res.status(200).json({success: true });
  try {
  debugger;
  // const user= req.user; //no user since its by member
  // const userId  = user._id;
 
  const quiz = req.body.quiz;
  const quizResult = req.body.quizResult;
  //very confusing the incomming quiz should be Test
 quizResult.testId = quiz.testId.toString(); 

  //--do not store 2 responses
      // const quizId = quizResult.quizId;
      // const existingResult = await Result.findOne({ quizId:quizResult.quizId , email:quizResult.email });
      // if (existingResult) {
      //     return res.status(400).json('Result already exists for this member');
      // }
    
    
    
      // newResult.userId = user._id;

      let result = new Result(quizResult);
      await result.save();
      res.status(200).json({ success: true, msg: 'Result saved successfully' });
    // }
  } catch (err) {
    // console.error(err);
    res.status(500).json({success: false, message: 'Server error' });
  }
});

resultRouter.post('/analytics', async (req, res) => {
try {
// const user= req.user;
    // const userId  = req.userId;
    const quizId = req.body.quizId;
    const quiz =  await Test.findById(quizId);
    //---The _id of the incomming result is stored in the testId of the result and the Survey / Run that created it is deleted
    const results = await Result.find({ testId :quiz._id });
    res.json({ results,quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({  msg: 'Server error' });
  }
});

resultRouter.post( "/del" , async function(req,res) {
  try {
  debugger;
    const resultId = req.body.resultId;
const user= req.user;
    const userId  = req.userId;

  if (userId == null) {
    return res.status(400).json({ msg: "please register or login" });
  }
//---check if quiz has responses

    const r = await Result.deleteOne({ _id: resultId });
    return res.status(200).json({ msg : "deleted" });
//----------------------------------
  } catch(error) {
    return res.status(400).json({msg : "failed to delete"  });
  }
});

resultRouter.post("/deleteAll", async function(req, res) {
  try {
  debugger;
    const testId = req.body.quizId;
    const userId  = req.user._id;
   
    if (userId == null) {
      return res.status(400).json({ msg: "please register or login" });
    }

    await Result.deleteMany({ testId , userId });
    return res.status(200).json({ msg: "deleted all results" });
  } catch (error) {
    return res.status(400).json({ msg: "failed to delete  results" });
  }
});
////////////////////////////////////////////////////////
module.exports = resultRouter;





