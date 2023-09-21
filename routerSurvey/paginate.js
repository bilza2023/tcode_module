 
//--Require
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const appConfig = require("../common/appConfig");
const Survey = require("../models/survey/survey");
const Result = require("../models/result");

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");
// const newQuiz = require('../models/new_quiz.js');
const Subscriber = require("../models/subscriber.js");


async function paginate(req,res , limit , count){

  // try {
    // const { limit = 20, count = 0 } = req.params;
// debugger;
const user= req.user;
const userId  = user._id;

      const quizzes = await Survey.find({"userId" : userId})
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(Number(limit))
      .skip(Number(count));

    return res.status(200).json({msg : "success" , quizzes });
  // } catch(error) {
  //   // return res.status(400).json({msg : "failure" , error  });
  //   const r = await respFail(res,"unknown error","unknownError");
  //   return r;
  // }
}

module.exports  = paginate;
