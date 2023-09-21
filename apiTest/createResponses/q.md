Here is the main code
const Survey = require("../../models/survey"); 
const getResponseData = require('./getResponseData.js'); 
const getMCQRespData = require('./getMCQRespData.js'); 
const getNonMCQRespData = require('./getNonMCQRespData.js'); 
async function createResponses() {

const incommingQuiz = await Survey.findById('647f2f5157e8c14a380fd5d1');
    // console.log("incommingQuiz",incommingQuiz);

    for (let i = 0; i < incommingQuiz.members.length; i++) {
        const member = incommingQuiz.members[i];
            const response = getResponseData( 
            incommingQuiz._id.toString(),
            incommingQuiz.userId,
            member.email);

        response.answers = getAnswers(incommingQuiz.questions);

        console.log("response",response);
    }
    // const createIndlResp = createIndlResp();
    // response.answers =  createIndlResp(incommingQuiz.questions);
    console.log("createResponses...");
}




function getAnswers(questions){
    const answers =[];
    for (let i = 0; i < questions.length; i++) {        
        const question = questions[i];
        console.log("question",question);

        if(question.questionType == 'SurveyMCQ'){
            answers.push(getMCQRespData(question));
        }else {
            answers.push(getNonMCQRespData(question));
        }
    }
    return answers;
}

module.exports = createResponses;



here is getMCQRespData.js
const mongoose = require('mongoose');

function getMCQRespData(question){

      console.log('question.multiSelect:', question.multiSelect);
    return {
    id : new mongoose.Types.ObjectId().toString(),
    questionId : question._id.toString(),
    totalMarks : 10,
    multiSelect :  question.multiSelect,
    required : question.required,
    // payload : question.payload,
    selectedOptions : [],
    questionType : question.questionType
    };
}


here is console.log out out of the main code ==>
MongoDb ===> connection established
question {
  id: '53bdcf42-7780-4575-b789-356d83bd09a2',
  required: false,
  content: 'Question Statement',
  explanation: '',
  questionType: 'SurveyMCQ',
  _id: new ObjectId("647f2f5157e8c14a380fd5d2"),
  __v: 0,
  __t: 'SurveyMCQ',
  multiSelect: true,
  selectedOptions: [],
  correctOptions: [
    '1f373d94-91d0-4d39-8b34-227a0dc588db',
    'f45edc78-517e-43c6-8c5f-aa05873642fa'
  ],
  displayOptions: 'bars',
  options: [
    {
      id: '1f373d94-91d0-4d39-8b34-227a0dc588db',
      content: 'Option One',
      _id: '647f2f5157e8c14a380fd5d3'
    },
    {
      id: 'e33352e9-ced2-4194-a9ba-2e1a4dfb45d8',
      content: 'Option Two',
      _id: '647f2f5157e8c14a380fd5d4'
    },
    { id: 'f45edc78-517e-43c6-8c5f-aa05873642fa', content: 'cddc' }
  ]
}
question.multiSelect: undefined
response {
  id: '647fe9bf9a81915734b0433f',
  userId: '64202224fd8518cb214bd138',
  quizId: '647f2f5157e8c14a380fd5d1',
  email: 'aaa@msn.com',
  ip: '203.0.113.0',
  countryCode: 'PK',
  answers: [
    {
      id: '647fe9bf9a81915734b04340',
      questionId: '647f2f5157e8c14a380fd5d2',
      totalMarks: 10,
      multiSelect: undefined,
      required: false,
      selectedOptions: [],
      questionType: 'SurveyMCQ'
    }
  ]
}
createResponses...

please check why multiSelect in the question can not be read 

module.exports = getMCQRespData;