
const skillzaErrList = require('../../skillzaaError/skillzaaErrList');
const Result =  require('../../models/result');

/////////////////////////////////////////////////////

async function classHasResult (mdl,data,backendData){
    try{    
    // debugger; 
    const id = data.id; 
    const rez = await Result.count({classId :id});
      if (rez >  0){
         const Err = skillzaErrList.getErr("hasResults");
        throw Err;
      }else {
        return true;
      }

    }catch(error){
        throw error;
    }
}

module.exports = classHasResult;