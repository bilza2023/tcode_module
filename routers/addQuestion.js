
const getModel = require('./getModel.js');

async function addQuestion(qData){
try{
     //-11 items ===DONT DELETE  
    // 1: board 
    if(!inarray(qData.board, ['Punjab', 'Pakhtoonkhwa', 'Sind', 'Balochistan', 'FBISE'])){
        return {ok:false, message:'board name not found'};
    }
   
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

   //7 : check name for url safe
    // 8 : exercise
    if(!checkString(qData.exercise)){
        return {ok:false, message:'Exercise must be a string'};
    }
    // 9 : questionNo //can be 0 not nec to be positive
    if(! Number.isInteger(qData.questionNo)){
        return {ok:false, message:'Question No must be a  number'};
    }
    // 10 : part //can be 0 not nec to be positive
    if(!Number.isInteger(qData.part)){
        return {ok:false, message:'Part must be a  number'};
    }

//==checking done now prep the question
     const newQuestion =  {
        board : qData.board,
        classNo : qData.classNo,
        chapter : qData.chapter,
        exercise : qData.exercise,
        questionNo : qData.questionNo ,
        part: qData.part,
        name : qData.name,
        questionType : 'paid',
        status : 'empty',
        sortOrder : 0,
        filledBy :'',
        filename : '',
        slides : [],
        teacherComments:'',
        adminComments:''
    };
    debugger;

    getFilename(newQuestion) //last step no 11

//===now save question in appropriate collection
  const tcode  = qData.tcode; 
  
  if (!tcode) {return  {ok:false, message:'missing tcode'}};
  const theMdl = await getModel(tcode);
  if(!theMdl) { return res.status(404).json({ ok:false, message: "tcode not found" });}
 const newQ = await theMdl.create(newQuestion);
      return {ok:true , question:newQ};

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

function checkString(name){
    if (name === null || name === undefined || name.trim() === '') {
        return false; // Special Questions must have a name
    }
    return true; // Name is valid
}

function getFilename(question){
if (question.name &&  question.name !== ''){    
    //even if there is a name the questionNo and part ==0
    question.filename = `${question.board.toLowerCase()}_cl_${question.classNo}_ch_${question.chapter}_ex_${question.exercise}_q_${question.questionNo}_pt_${question.part}_${question.name}`;
    
}else {
    question.filename = `${question.board.toLowerCase()}_cl_${question.classNo}_ch_${question.chapter}_ex_${question.exercise}_q_${question.questionNo}_pt_${question.part}`;
 }
}


function shouldBePositiveNumber(value) {
    return Number.isInteger(value) && value > 0;
}

function inarray(value, array) {
    return array.includes(value);
}