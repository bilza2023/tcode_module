const { Template } = require("../models/survey/survey.js");
const { SurveyMCQ } = require("../models/survey/svyQuestion.js");
const uuid = require('../common/uuid.js');

async function addQuestionsToQuiz(templateId, questions) {
  try {
    // Find the template using the templateId
    const template = await Template.findById(templateId);

    await addIdsToAOO(questions);
    await addIdsToOptions(questions);
    await addCorrectOptions(questions);

    const castedQuestions = await castQuestions(questions);
    // Set the template.questions to the provided questions
    template.questions = castedQuestions;

    // Save the template
    await template.save();

    console.log("Questions added to the Template");
  } catch (error) {
    console.error(error);
  }
}

module.exports = addQuestionsToQuiz;

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
async function addIdsToAOO(aoo){
    for (let i = 0; i < aoo.length; i++) {
        const e = aoo[i];
        e.id = uuid();
    }

}
async function castQuestions(questions){
const castedQuestions = [];
    for (let i = 0; i < questions.length; i++) {
            const q = new SurveyMCQ( questions[i]  );
            castedQuestions.push( q );
    }
return castedQuestions;
}

async function addCorrectOptions(questions){
    for (let i = 0; i < questions.length; i++) {
        
        const question = questions[i];
            question.correctOptions = [];
            question.questionType = 'SurveyMCQ';
        
        for (let j = 0; j < question.options.length; j++) {
            const option = question.options[j];
            if (option.correct === true){
                question.correctOptions.push(option.id);6
            }
        }
    }
}
async function addIdsToOptions(aoo){
    for (let i = 0; i < aoo.length; i++) {
        const e = aoo[i];
        if(e.options.length > 0) {
            addIdsToAOO(e.options)
            // console.log(e.options);    
        }
    }
}