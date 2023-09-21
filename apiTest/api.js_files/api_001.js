require('dotenv').config();
const db = require("./mongoDb/mongo.js");
//////---survey section--
const Survey = require("./models/survey/survey.js");
const {SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail} = require("./models/survey/svyQuestion.js");
///--survey related fn
const createBasicSvy=require('./apiTest/createBasicSvy/createBasicSvy.js');
//--example  : createBasicSvy(Survey,SurveyInput,SurveyMCQ);
const deleteAllSurveys = require('./apiTest/deleteAllSurveys.js');
const createDemoSvyMCQ = require('./apiTest/createDemoSvyMCQ.js');
//////////////////////////////////////////////////////

console.log("api test");
db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    createBasicSvy(Survey,SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail);
    // createDemoSvyMCQ(Survey,SurveyMCQ);
    // deleteAllSurveys(Survey);
});


