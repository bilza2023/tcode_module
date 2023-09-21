const Result = require("../../models/result");

const skillzaErrList = require('../../mongoWrapper/skillzaaError/skillzaaErrList');


async function checkForResponses(mdl,data,backendData){
   try {
    const count = await Result.countDocuments({ testId: data.id,userId:data.userId });
      if(count != 0 ){
        throw skillzaErrList.getErr("testHasResponses");
      }else {
        return true;
      }
  } catch (error) {
    throw error;
  }
}



module.exports = checkForResponses;