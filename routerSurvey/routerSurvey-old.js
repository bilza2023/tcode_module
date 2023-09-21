require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const {Survey,Test,Template} = require("../models/survey/survey");


const save = require("./save");
// const updatePublish = require("./update/updatePublish");
 
// const clone = require("./clone");
const maketest = require("./maketest");
const find = require("./find");
const deleteSurvey = require('./deleteSurvey');
const truncateSurvey  = require('./truncateSurvey');
// const featuredQuiz = require("./featuredQuiz");
const paginate = require("./paginate");
// const deleteQuiz = require("./deleteQuiz");

/////////////////////////////////////////////////
const surveyRouter = express.Router();
surveyRouter.use(auth);
/////////////////////////////////////////////////
 
surveyRouter.post("/save", async function(req, res) {
// debugger;
  await save(req,res);
});


surveyRouter.post("/maketest", async function(req, res) {
   maketest(req, res);
});


////////////////////////////////////////////////////////
module.exports = surveyRouter;
////////////////////////////////////////////////////////


