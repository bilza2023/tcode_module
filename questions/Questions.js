const mongoose = require("mongoose");
const {MathFull} = require("../models/mathFull.js");
const {Eqs,Grid} = require('../models/mathFullEmbededSchemas.js');
const checkNewQ = require('./fns/checkNewQ.js');
// const createNewQSpecial = require("./fns/createNewQSpecial.js");
// const createNewQReg = require("./fns/createNewQReg.js");
const deleteQ = require("./fns/deleteQ.js");
const getQReg = require("./fns/getQReg.js");


class Questions{

//create new
static async CreateQReg(questionType,board,classNo,chapter,exercise,questionNo,part){
 try{
 debugger;
    const qReg = getQReg(questionType,board,classNo,chapter,exercise,questionNo,part);
    const questionData = checkNewQ(qReg);
            
            let q = new MathFull(questionData.question);
            const question = await q.save();
            
      return { question ,ok:true};
 } catch (e) {
    return {message: e.message , ok:false,errorCode : e.code}
 }

}
///////////////////////////////

//////////////////////////
static async DeleteQ(id){
try{
 debugger;
     let objectId = new mongoose.Types.ObjectId(id);
     await MathFull.findByIdAndRemove(objectId );    
      return {ok : true ,message : "Question deleted", status:200 };
}catch(err){
    return {ok : false , message : "Failed to delete", };
}  
}

}//questions

module.exports = Questions;