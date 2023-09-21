const mongoose = require('mongoose');

function getNonMCQRespData(question){

    return {
    id : new mongoose.Types.ObjectId().toString(),
    questionId : question._id.toString(),
    totalMarks : 10,
    required : question.required,
    payload : question.payload,
    questionType : question.questionType
    };
}


module.exports = getNonMCQRespData;