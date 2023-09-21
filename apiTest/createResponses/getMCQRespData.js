const mongoose = require('mongoose');

function getMCQRespData(question){

      const r = {
    id : new mongoose.Types.ObjectId().toString(),
    questionId : question._id.toString(),
    totalMarks : 10,
    // multiSelect :  question.multiSelect,
    multiSelect :  false,
    required : question.required,
    // payload : question.payload,
    selectedOptions : [],
    questionType : question.questionType
    };
    r.multiSelect = question.multiSelect;

    // console.log('question.multiSelect:', question.multiSelect);
    // console.log('r.multiSelect', r.multiSelect);

return r;
}


module.exports = getMCQRespData;