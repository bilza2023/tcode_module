
const {getSurvey} = require('../../globals/questionTypesData');
const Survey = require('../../models/survey/survey');
const { SurveyMCQ } = require('../../models/survey/svyQuestion');

async function manualSurvey(){

 let survey = new Survey( getSurvey('64202224fd8518cb214bd138' , "Manual") );
    survey.questions = []; 
    
    const question1 = {
      "id": "f7f6e03a-63b4-4be3-91ea-2b5e1b36f382",
      "content": "Which of the following countries is both in Europe and Asia?",
      "explanation": "",
      "multiSelect": false,
      "correctOptions": [
        "b245e305-4d34-4177-835a-2c85e2e206b3"
      ],
      "options": [
        {
          "id": "b245e305-4d34-4177-835a-2c85e2e206b3",
          "content": "Turkey"
        },
        {
          "id": "a1721e97-7c17-45a6-bc6a-5f0a4e8d67a8",
          "content": "Canada"
        },
        {
          "id": "8e10c086-4a94-4e6f-9361-02408d6d1777",
          "content": "Brazil"
        },
        {
          "id": "f15a33ed-303a-4d46-9b65-2be4643d0e2f",
          "content": "Australia"
        }
      ]
};  

   const q = new SurveyMCQ(q2db(question1));
    await q.save();
  survey.questions.push(q);
  
/////////////////////////////////////////////////////////////

    await survey.save();
    console.log("createBasicSvy: survey saved...");



}

module.exports = manualSurvey;

    function q2db(question){

      const r = {
      ...question,
        "required": false,  
        "questionType": "SurveyMCQ",
        "selectedOptions": [],  
        "displayOptions": "bars"
      }
        return r;  
    }