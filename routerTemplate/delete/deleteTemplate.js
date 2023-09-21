require('dotenv').config();
const auth = require('../../middleware/auth');
const express = require('express');
const appConfig = require("../../common/appConfig");
const {Template} = require("../../models/survey/survey");


const respOk = require("../../common/respOk");
const respFail = require("../../common/respFail");

async function deleteTemplate (userId,quizId) {
  try {
    const r = await Template.deleteOne({ _id: quizId , userId });
    return  true;

  } catch(error) {
    throw skillzaErrList.getErr("deleteError");
  }
}


module.exports = deleteTemplate;
