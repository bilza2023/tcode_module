
//--Require
require('dotenv').config();
// const express = require('express');
// const auth = require('../middleware/auth');

const appConfig = require("../common/appConfig");

const {Test,Template} = require("../models/survey/survey");
const respOk = require("../common/respOk");
const respFail = require("../common/respFail");
/////////////////////////////////////////////////
// const surveyRouter = express.Router();
// surveyRouter.use(auth);
/////////////////////////////////////////////////

async function maketest(req, res) {
  try {
//   debugger;
    const id = req.body.id;
    const userId = req.user._id;
    const title = req.body.title;

  ///////////////////---limit new quiz--////
  if (userId !== process.env.OWNER_ID ){
  const prev = await Test.count({userId :userId});
    if (prev > appConfig.MAX_QUIZ_ALLOWED ){
    return respFail(res,`At the momnent no more than ${appConfig.MAX_QUIZ_ALLOWED} Projects are allowed`,"maxQuizReached");
    }
  }
  //////--limit ends

    const originalQuiz = await Template.findById(id);
    if (!originalQuiz) {
      return res.status(404).json({ msg: "Template not found" });
    }
    const survey = new Test(originalQuiz.toObject());
    // userId is already set
    survey._id = undefined;
    survey.published = false; //important
    survey.members = []; //important
    survey.isNew = true;
    survey.title = title; //--new title
    survey.createdAt = Date.now();
    await survey.save();
    return res.status(200).json({ survey ,msg: "Test Created.." }); 
  } catch (error) {
    // console.log(error);
    // return res.status(400).json({ msg: "Failed to clone quiz." });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}

module.exports = maketest;