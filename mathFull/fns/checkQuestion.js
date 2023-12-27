
//chapter,exercise,questionNo,part ="",classNo = 9,board = 'FBISE'
function checkQuestion(coreQData){
try{
const question = {...coreQData};
//////////////////////////////////////////
if (question.isSpecial == true){
    // debugger;
    //if its special we only need the name in partNo
    const pno = {};
    pno.name = coreQData.partNo.name;
    pno.exercise = coreQData.partNo.exercise;
    question.partNo = pno;
    //--exercise bound special question
    if (question.partNo.exercise !== "" && question.partNo.exercise !== undefined){
    question.filename = `${question.board.toLowerCase()}_cl_${question.classNo}_ch_${question.chapter}_ex_${question.partNo.exercise}_${question.partNo.name}`;
    }else {
    //--chapter bound special question
    question.filename = `${question.board.toLowerCase()}_cl_${question.classNo}_ch_${question.chapter}_${question.partNo.name}`;
    }
    //     }
}else {
    const pno = {};
    checkValidString(coreQData.partNo.exercise);
    pno.exercise = coreQData.partNo.exercise;
    checkValidNumber(coreQData.partNo.questionNo)
    greaterThanZero(coreQData.partNo.questionNo)
    pno.questionNo = coreQData.partNo.questionNo;
    pno.part = coreQData.partNo.part;
    question.partNo = pno;
    question.filename = `${question.board.toLowerCase()}_cl_${question.classNo}_ch_${question.chapter}_ex_${question.partNo.exercise}_q_${question.partNo.questionNo}_pt_${question.partNo.part}`;
 }
    ////////////////////////////////////////////////
    // console.log('question' , question);
     if (question.questionType == "eqs"){
        return {question,eqs:{eqs:[]} };
    }else if(question.questionType == "grid"){
        return {question,grid:{ grid:{} }  };
    }

 }catch(e){
    console.log("failed to create question");
 }
}
//////////////////////////////////////

module.exports = checkQuestion;