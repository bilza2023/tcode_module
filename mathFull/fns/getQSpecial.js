
const getCoreQData = require("./getCoreQData.js");

//questionType is just one argument there is no need to have a seperate function for just this.
//questionType can be "eqs" or "grid"
//-we can insert a spwecial question in exercise as well as a chapter. for chapter level specail questions the exercise == ""
//--so specail is just missing questionNo and 
function getQSpecial(questionType,board,classNo,chapter,name,exercise=""){
    const question = {...getCoreQData()};
    question.isSpecial = true;// its Q_Regular

    question.questionType = questionType;
    question.board   = board;
    question.classNo = classNo;
    question.chapter = chapter;

    question.partNo.name = name; 
    question.partNo.exercise = exercise;

    return question;
}


module.exports = getQSpecial;