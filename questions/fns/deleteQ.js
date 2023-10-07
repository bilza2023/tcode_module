const mongoose = require('mongoose');
const checkNewQ = require("./checkNewQ.js");
const getQReg = require("./getQReg.js");
const {MathFull} = require("../../models/mathFull.js");
const {Eqs} = require("../../models/mathFullEmbededSchemas.js");
const {Grid} = require("../../models/mathFullEmbededSchemas.js");



async function deleteQ(id){
debugger;
try{
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
        await Eqs.findByIdAndRemove(question.ref);
        await MathFull.findByIdAndRemove(id);
        return {ok : true ,message : "Question deleted", status:200 };
        }
     }
     if(question.questionType == "grid"){
      const gr = await Grid.findById(question.ref);
        if (gr.grid.length > 0){
            return {ok : false ,message : "Question has content", status:500 };
        }else {
        await Grid.findByIdAndRemove(question.ref);
        await MathFull.findByIdAndRemove(id);
        return {ok : true ,message : "Question deleted", status:200 };
        }
    }
   
    return true;
}catch(err){
    return false;
}  
}

module.exports = deleteQ;