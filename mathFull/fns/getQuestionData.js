
function getQuestionData(qData){
    // debugger;
    const question = {...getCoreQData()};
     //-11 items ===DONT DELETE  
    // 1: question.board = board; --already set by coredata
    // question.isSpecial = Boolean(qData.isSpecial);
    // question.questionType = qData.questionType;--already set by coredata
    // question.status = 'empty; --already set by coredata

    question.classNo = qData.classNo;
    if(!shouldBePositiveNumber(question.classNo)){
        return {ok:false, message:'Class number must be a positive number'};
    }

    question.chapter = parseInt(qData.chapter);
    if(!shouldBePositiveNumber(question.chapter)){
        return {ok:false, message:'Chapter must be a positive number'};
    }

    if (typeof qData.isSpecial !== "boolean") {
    question.isSpecial = qData.isSpecial === "true";
    }

    //--name
    question.partNo.name = qData.name; 
    const tf = checkName(question.isSpecial,question.name);
     if (!tf){
     return {ok:false, message:'Special Question must have a name'};
     }
    
    question.partNo.exercise = qData.exercise; 
    if(!checkString(question.partNo.exercise)){
        return {ok:false, message:'Question No must be a positive number'};
    }

    question.partNo.questionNo = qData.questionNo; 
    if(!shouldBePositiveNumber(question.partNo.questionNo)){
        return {ok:false, message:'Question No must be a positive number'};
    }

    question.partNo.part = qData.part; 
    if(!shouldBePositiveNumber(question.partNo.part)){
        return {ok:false, message:'Chapter must be a positive number'};
    }

    getFilename(question);
     

   return  {ok:true,question};
}


module.exports = getQuestionData;
////////////////////////////==hELPER fUNCTIONS
function checkName(isSpecial,name){
    if (isSpecial && (name === null || name === undefined || name.trim() === '')) {
        return false; // Special Questions must have a name
    }
    return true; // Name is valid
}
function checkString(name){
    if (name === null || name === undefined || name.trim() === '') {
        return false; // Special Questions must have a name
    }
    return true; // Name is valid
}

function getFilename(question){
if (question.isSpecial == true){
    // debugger;
    //if its special we only need the name AND EXERCISE in partNo
     question.filename = `${question.board.toLowerCase()}_cl_${question.classNo}_ch_${question.chapter}_ex_${question.partNo.exercise}_${question.partNo.name}`;
    
    
}else {
    
    question.filename = `${question.board.toLowerCase()}_cl_${question.classNo}_ch_${question.chapter}_ex_${question.partNo.exercise}_q_${question.partNo.questionNo}_pt_${question.partNo.part}`;
 }


}
function getCoreQData(){
 //11 items
return {
board : 'FBISE',
classNo : 9,
chapter : 0,
isSpecial : false,
questionType : 'paid',
status : 'empty',
partNo : {exercise : "1.1",questionNo : 1 ,part: "",name : ""},
filename : ""
};
}

function shouldBePositiveNumber(value) {
    return Number.isInteger(value) && value > 0;
}