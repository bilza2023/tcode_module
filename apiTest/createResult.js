//--The project files has all the data where as all the models are send by api.js
const  Result = require('../models/result.js');


async function createResult() {
    
    const data = {};
    data.quizId = '64784f0081e7c8b4afe7a310';
    data.userId = '64202224fd8518cb214bd138';
    data.countryCode = 'pk';
    data.memberEmail = 'abc@example.com';

    data.correctAnswers = [];
    data.skippedAnswers = [];
    data.wrongAnswers = [];

    data.openAnswers = [];
    openOne = {
        questionId : '123',
        questionType : 'SurveyInput',
        payload : 'payload53453'
    }
    openTwo = {
        questionId : '456',
        questionType : 'SurveyParagraph',
        payload : 'payloadxxx'
    }
    data.openAnswers.push(openOne);
    data.openAnswers.push(openTwo);

    

    const result = new Result(data);

            //     const caseSurveyParagraph = new SurveyParagraph(baseParagraph);
            //     await caseSurveyParagraph.save();
            //     survey.questions.push(caseSurveyParagraph);
            //   ///
              
    await result.save();
    console.log("Create Result: result saved...");
}


module.exports = createResult;

