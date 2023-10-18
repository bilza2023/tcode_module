
//chapter,exercise,questionNo,part ="",classNo = 9,board = 'FBISE'
function checkNewQ(coreQData){
try{
const question = {...coreQData};

checkValueInArray(question.questionType, ['eqs','grid']);
checkValueInArray(question.status, ['unlocked' ,'fill' ,'locked', 'final']);

checkValueInArray(question.board, ['Punjab', 'Pakhtoonkhwa', 'Sind', 'Balochistan', 'FBISE']);

checkValidNumber(question.classNo);
greaterThanZero(question.classNo);

checkValidNumber(question.chapter);
greaterThanZero(question.chapter);


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
function checkValueInArray(value, array) {
    if (!array.includes(value)) {
        throw new Error("Invalid input. Value is not in the array.");
    }
    return value;
}
function checkValidString(str) {
    if (str === null || str === "") {
        throw new Error("Invalid string. String is null or empty.");
    }
    return str;
}
function greaterThanZero(num) {
    if (num <= 0) {
        throw new Error("The number is equal to or less than zero.");
    }
    return num;
}
function checkValidNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) {
        throw new Error("Invalid input. Input is not a valid number.");
    }
    return num;
}
module.exports = checkNewQ;