
//--Require
require('dotenv').config();
// const auth = require('../middleware/auth');
// const express = require('express');
const appConfig = require("../common/appConfig");
const Survey = require("../models/survey/survey");
const Result = require("../models/result");

const respOk = require("../common/respOk");
const respFail = require("../common/respFail");


async function truncateSurvey (req,res) {
  try {
  
      const r = await Survey.deleteMany({ });
    return res.status(200).json({ msg : "deleted" });
  
//----------------------------------
  } catch(error) {
    // return res.status(400).json({msg : "failed to delete", error  });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }
}


module.exports = truncateSurvey;
