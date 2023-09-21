
const skillzaErrList = require('../../skillzaaError/skillzaaErrList');



async function oneReultPerStudent (mdl,data,backendData){
    try{    
    // debugger; 
    const item = data.item; 
    const rez = await mdl.count({runId :item.runId , studentId :item.studentId});
      if (rez >  0){
         const Err = skillzaErrList.getErr("oneResultPerStudent");
        throw Err;
      }else {
        return true;
      }

    }catch(error){
        throw error;
    }
}

module.exports = oneReultPerStudent;