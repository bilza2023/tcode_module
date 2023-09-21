const schemaToQuestions = require('./schemaToQuestions');
const skillzaErrList = require('../../skillzaaError/skillzaaErrList');

async function ApplySchemaToQuestions(mdl , data){
const questions = data.item.questions;
    //---object to schema.
    const newQuestions = await schemaToQuestions(questions);
    if (newQuestions == null) {
        throw skillzaErrList.getErr("QuestionTypeModelError");
    }
      data.item.questions = newQuestions;
}

module.exports = ApplySchemaToQuestions;