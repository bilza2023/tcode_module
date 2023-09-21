
const skillzaErrList = require('../../skillzaaError/skillzaaErrList');

/////////////////////////////////////////////////////////
async function checkMax(mdl,data,backendData){
    try{    
    // debugger; 
      const prev = await mdl.count({userId :data.userId});
      if (prev > backendData.checkMaxValue ){
         const Err = skillzaErrList.getErr("maxItemLimitExceeded");
        throw Err;
      }else {
        return true;
      }

    }catch(error){
        throw error;
    }
}

module.exports = checkMax;