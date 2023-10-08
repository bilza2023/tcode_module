const mongoose = require("mongoose");
const {MathFull} = require("../models/mathFull.js");
const {Eqs,Grid} = require('../models/mathFullEmbededSchemas.js');
const checkNewQ = require('./fns/checkNewQ.js');
const deleteQ = require("./fns/deleteQ.js");
const getQReg = require("./fns/getQReg.js");
const getQSpecial = require("./fns/getQSpecial.js");

class Questions{

//create new
static async CreateQSpecial(questionType,board,classNo,chapter,name){
 try{
 debugger;
    const qReg = getQSpecial(questionType,board,classNo,chapter,name);
    const questionData = checkNewQ(qReg);
            
            let q = new MathFull(questionData.question);
            const question = await q.save();
            
      return { question ,ok:true};
 } catch (e) {
    return {message: e.message , ok:false,errorCode : e.code}
 }

}
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
static async Delete(id){
try{
 debugger;
     let objectId = new mongoose.Types.ObjectId(id);
     const question = await MathFull.findById(objectId );    
     if (!question){
            return {ok : false ,message : "question not found", status:404 };
     }
     if (question.questionType === "eqs"){
        if (question.eqs.length > 0){
            return {ok : false ,message : "question has content", status:500 };
        }
     }
     if (question.questionType === "grid"){
        if (question.grid && question.grid.rows && question.grid.rows.length > 0){
            return {ok : false ,message : "question has content", status:500 };
        }
     }

     await MathFull.findByIdAndRemove(objectId );    
     return {ok : true ,message : "Question deleted", status:200 };

}catch(err){
    return {ok : false , message : "Failed to delete", };
}  
}

}//questions

module.exports = Questions;