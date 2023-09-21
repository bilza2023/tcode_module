const Survey = require("../../models/survey/survey"); 
const Result = require("../../models/result"); 

const getResponseData = require('./getResponseData.js'); 
const getMCQRespData = require('./getMCQRespData.js'); 
const getNonMCQRespData = require('./getNonMCQRespData.js'); 

async function createResponses() {

    const incommingQuiz = await Survey.findById('64803b977bcf7eb9a48578b0');
    // console.log("incommingQuiz",incommingQuiz);

    for (let i = 0; i < incommingQuiz.members.length; i++) {
        const member = incommingQuiz.members[i];
        console.log("member" , member);
            const response = getResponseData( 
                                        incommingQuiz._id.toString(),
                                        incommingQuiz.userId,
                                        member.email);

        
        response.answers = getAnswers(incommingQuiz.questions);
        let result = new Result(response);
        await result.save();
        console.log("result",result);
    
        // console.log("response",response);

    }
    console.log("createResponses!!...");
}




function getAnswers(questions){
// console.log("questions",questions);
    const answers =[];
    for (let i = 0; i < questions.length; i++) {        
        const question = questions[i];
        // console.log("question.multiSelect",question.multiSelect);

        if(question.questionType == 'SurveyMCQ'){
            answers.push(getMCQRespData(question));
        }else {
            answers.push(getNonMCQRespData(question));
        }
    }
    return answers;
}

module.exports = createResponses;

