


const {SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail} = require('../models/survey/svyQuestion');

    const schemaMap = {
    "SurveyMCQ" : SurveyMCQ,
    "SurveyInput"   : SurveyInput,
    "SurveyParagraph"   : SurveyParagraph,
    "SurveyNumber"  : SurveyNumber,
    "SurveyUrl" : SurveyUrl,
    "SurveyPassword"    : SurveyPassword,
    "SurveyEmail"   : SurveyEmail
    };


 async function ObjToSchema(questions) {
  const newQuestions = [];

  try{  
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    if (!question._id) {
    //--great technique.
    // debugger;
      const SchemaConstructor = schemaMap[question.questionType];
    //   const SchemaConstructor = schemaMap['SurveyMCQ'];
      const q = new SchemaConstructor(question);
      newQuestions.push(q);
    } else {
      newQuestions.push(question);
    }
  }
  return newQuestions;
  }catch (e) {
   return null; 
  }
}

module.exports = {ObjToSchema};