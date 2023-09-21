/**
 * Very interesting code. It "places all the choosable functions" and an associated slug in an object schemaMap. Since the slug in schemaMap and the question.questionType are equal we can extract the correct function associated with the slug.

 schemaMap is a database for mapping the slug/questionType and its associated functions. Once this is done all we have to do is match the schemaMap slug with question.questionType.

 We can add more records to the schemaMap and as long as the question bring correct questionType they will get translated correctly here.

 STRATEGY PATTERN
 =================
 This code is a Switch/Multiplexer mechanism that can be used in any other place. All we need a group of functions associated with slugs and the incomming objects must have a property that has the same text as the slug, and then that function will be applied.

 */


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

// const newQuestions = await ObjToSchema(questions);
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

//---------------------------
module.exports = ObjToSchema;