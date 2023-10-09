
const getCoreQData = require("./getCoreQData.js");

//questionType is just one argument there is no need to have a seperate function for just this.
//questionType can be "eqs" or "grid"
function getQSpecial(questionType,board,classNo,chapter,name){
    const question = {...getCoreQData()};
    question.isSpecial = true;// its Q_Regular

    question.questionType = questionType;
    question.board = board;
    question.classNo = classNo;
    question.chapter = chapter;

    question.partNo.name = name; 

    return question;
}


module.exports = getQSpecial;