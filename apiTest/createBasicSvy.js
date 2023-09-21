
const Survey = require("../models/survey/survey.js");
 const {SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail} = require("../models/survey/survey.js");

const {getDataUrl,getDataPassword,getDataParagraph,getDataNumber,getDataInput,getDataEmail,getDataMCQ,getDataBaseMCQ, getMcqWOption, getSurvey} = require('../globals/questionTypesData.js');
 
 
async function createBasicSvy(name="New Survey") {

//--64202224fd8518cb214bd138 this is userId remains the same
 let survey = new Survey( getSurvey('64202224fd8518cb214bd138' , name) );

                const caseSurveyMCQ = new SurveyMCQ(getDataMCQ());
                await caseSurveyMCQ.save();
                survey.questions.push(caseSurveyMCQ);
              ///
              
                const caseSurveyInput = new SurveyInput(getDataInput());
                await caseSurveyInput.save();
                survey.questions.push(caseSurveyInput);
              ////
              
                const caseSurveyParagraph = new SurveyParagraph(getDataParagraph());
                await caseSurveyParagraph.save();
                survey.questions.push(caseSurveyParagraph);
              ///
              
                const caseSurveyEmail = new SurveyEmail(getDataEmail());
                await caseSurveyEmail.save();
                survey.questions.push(caseSurveyEmail);
              //

                const caseSurveyPassword = new SurveyPassword(getDataPassword());
                await caseSurveyPassword.save();
                survey.questions.push(caseSurveyPassword);
              
              
                const caseSurveyUrl = new SurveyUrl(getDataUrl());
                await caseSurveyUrl.save();
                survey.questions.push(caseSurveyUrl);
              //

              
                const caseSurveyNumber = new SurveyNumber(getDataNumber());
                await caseSurveyNumber.save();
                survey.questions.push(caseSurveyNumber);
              //
      
  
    await survey.save();
    console.log("createBasicSvy: survey saved...");
}


module.exports = createBasicSvy;

