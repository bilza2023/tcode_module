
const {MathFull} = require('./models');

async function addQuestion(qData){
try{
  // debugger;
     //-11 items ===DONT DELETE  
    // 1: board 
    if(!inarray(qData.board, ['Punjab', 'Pakhtoonkhwa', 'Sind', 'Balochistan', 'FBISE'])){
        return {ok:false, message:'board name not found'};
    }
    // 2: isSpecial
    //--i assume that if qData.isSpecial is not present or anything except true it will result as false 
    qData.isSpecial = JSON.parse(qData.isSpecial.toLowerCase());
    // 3: questionType
    qData.questionType = 'paid';
    // 4: status 
    qData.status = 'empty'; 
    // 5: classNo    
    if(!shouldBePositiveNumber(qData.classNo)){
        return {ok:false, message:'Class number must be a positive number'};
    }
    // 6: chapter 
    qData.chapter = parseInt(qData.chapter);
    if(!shouldBePositiveNumber(qData.chapter)){
        return {ok:false, message:'Chapter must be a positive number'};
    }

    // 7 : name
    const tf = checkName(qData.isSpecial,qData.name);
     if (!tf){
     return {ok:false, message:'Special Question must have a name'};
     }
    // 8 : exercise
    if(!checkString(qData.exercise)){
        return {ok:false, message:'Exercise must be a string'};
    }
    // 9 : questionNo
    if(!shouldBePositiveNumber(qData.questionNo)){
        return {ok:false, message:'Question No must be a positive number'};
    }
    // 10 : part
    if(!shouldBePositiveNumber(qData.part)){
        return {ok:false, message:'Part must be a positive number'};
    }

//==checking done now prep the question
     const q =  {
        board : qData.board,
        classNo : qData.classNo,
        chapter : qData.chapter,
        isSpecial : qData.isSpecial,
        questionType : 'paid',
        status : 'empty',
        partNo : {
                    exercise : qData.exercise,
                    questionNo : qData.questionNo ,
                    part: qData.part,
                    name : qData.name
                },
    };
    // debugger;
    getFilename(q) //last step no 11

//===now save question in appropriate collection
 if (q.board == 'FBISE'){
      let qa = new MathFull(q);
      const question = await qa.save();
      return {ok:true , question};
   }
}catch(e){
    // console.log(e);
    if(e.code == 11000){
    return {ok:false,message:'Question may already exist'};
    }else{
    return {ok:false,message:e.message};
    }
}

}

module.exports = addQuestion;
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


function shouldBePositiveNumber(value) {
    return Number.isInteger(value) && value > 0;
}
function inarray(value, array) {
    return array.includes(value);
}