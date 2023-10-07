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
static async CreateQRegEqs(board,classNo,chapter,exercise,questionNo,part){
const session = await mongoose.startSession();
session.startTransaction();
 try{
    const qReg = getQReg('eqs',board,classNo,chapter,exercise,questionNo,part);
    const questionData = checkNewQ(qReg);
            let eqsNew = new Eqs();
             let eqs = await eqsNew.save({session: session});
             questionData.question.ref = eqs._id;
            let q = new MathFull(questionData.question);
            const question = await q.save({session: session});
            
      await session.commitTransaction();
      session.endSession();
      return { question, eqs ,ok:true};
 } catch (e) {
    await session.abortTransaction();
    session.endSession();
    return {message: e.message , ok:false,errorCode : e.code}
 }

}
///////////////////////////////
static async CreateQRegGrid(board,classNo,chapter,exercise,questionNo,part){
const session = await mongoose.startSession();
session.startTransaction();
 try{
    const qReg = getQReg('grid',board,classNo,chapter,exercise,questionNo,part);
    const questionData = checkNewQ(qReg);
            let gridNew = new Grid();
             let grid = await gridNew.save({session: session});
             questionData.question.ref = grid._id;
            let q = new MathFull(questionData.question);
            const question = await q.save({session: session});
            
      await session.commitTransaction();
      session.endSession();
      return { question, grid ,ok:true};
 } catch (e) {
    await session.abortTransaction();
    session.endSession();
    return {message: e.message , ok:false,errorCode : e.code}
 }

}

//////////////////////////
static async DeleteQ(id){
const session = await mongoose.startSession();
session.startTransaction();
try{
 debugger;
     let objectId = new mongoose.Types.ObjectId(id);
    const question = await MathFull.findById( objectId );    

    if (!question) {
    //   console.log("Question not found");
      return {ok : false ,message : "Question not found", status:404 }; 
    }

     if(question.questionType == "eqs"){
        const eqs = await Eqs.findById(question.ref);
        if (eqs.eqs.length > 0){
            return {ok : false ,message : "Question has content", status:500 };
        }else {
        await Eqs.findByIdAndRemove(question.ref,{session:session});
        await MathFull.findByIdAndRemove(id,{session:session});
        // return {ok : true ,message : "Question deleted", status:200 };
        }
     }
     if(question.questionType == "grid"){
      const gr = await Grid.findById(question.ref).lean();
        if (gr.rows.length > 0){
            return {ok : false ,message : "Question has content", status:500 };
        }else {
        await Grid.findByIdAndRemove(question.ref,{session:session});
        await MathFull.findByIdAndRemove(objectId,{session:session});
        // return {ok : true ,message : "Question deleted", status:200 };
        }
    }
   //must run these lines.
    await session.commitTransaction();
    session.endSession();
      return {ok : true ,message : "Question deleted", status:200 };
}catch(err){
    return {ok : false , message : "Failed to delete", };
}  
}

}//questions

module.exports = Questions;