const ObjToSchema = require('./ObjToSchema');
const skillzaErrList = require('../../skillzaaError/skillzaaErrList');

async function updateSurvey(mdl , data){
const questions = data.item.questions;
    //---object to schema.
    const newQuestions = await ObjToSchema(questions);
    if (newQuestions == null) {
        throw skillzaErrList.getErr("QuestionTypeModelError");
    }
      data.item.questions = newQuestions;
}

module.exports = updateSurvey;