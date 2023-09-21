const Result = require("../models/result");

async function qExistInR (quizId,questionId){
// debugger;
let finalAnswer = false;
  const allQuizResults = await Result.find({"quizId" : quizId})
  for (let i = 0; i < allQuizResults.length; i++) {
    const result = allQuizResults[i];

      for (let ii = 0; ii < result.correctAnswers.length; ii++) {
        const canswer = result.correctAnswers[ii];
        if (canswer == questionId){
        finalAnswer =  true;
        }
      }
      for (let jj = 0; jj < result.skippedAnswers.length; jj++) {
        const canswer = result.skippedAnswers[ii];
        if (canswer == questionId){
        finalAnswer =  true;
        }
      }
      for (let kk = 0; kk < result.wrongAnswers.length; kk++) {
        const canswer = result.wrongAnswers[kk];
        if (canswer == questionId){
        finalAnswer =  true;
        }
      }
  }
return finalAnswer;  
}


module.exports = qExistInR;