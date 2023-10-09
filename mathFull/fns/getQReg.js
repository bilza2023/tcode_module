
const getCoreQData = require("./getCoreQData.js");

//questionType is just one argument there is no need to have a seperate function for just this.
//questionType can be "eqs" or "grid"
function getQReg(questionType,board,classNo,chapter,exercise,questionNo,part){
    const question = {...getCoreQData()};
    question.isSpecial = false;// its Q_Regular

    question.questionType = questionType;
    question.board = board;
    question.classNo = classNo;
    question.chapter = chapter;

    question.partNo.exercise = exercise; 
    question.partNo.questionNo = questionNo; 
    question.partNo.part = part; 

   return question;
}


module.exports = getQReg;