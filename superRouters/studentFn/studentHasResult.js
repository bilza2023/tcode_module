
const skillzaErrList = require('../../skillzaaError/skillzaaErrList');
const Result =  require('../../models/result');
const Student =  require('../../models/student');

/////////////////////////////////////////////////////

async function studentHasResult (mdl,data,backendData){
    try{    
    debugger; 
    const id = data.id; 
    const stu = await Student.findById(id);
    const studentId = stu.id;

    const rez = await Result.count({studentId});
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

module.exports = studentHasResult;