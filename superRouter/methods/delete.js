
  
const  runChecks = require('../coreFunctions/runChecks');

async function del(data,opt) {
  try{ 
        debugger;
         //---RUN CHECKS---AWAIT IS MUST
         await runChecks(
                  opt.delete.checks,
                  opt.model, 
                  data,
                  opt.delete.backendData
          );
        //---DELete   
        const item = await opt.model.deleteOne({ _id: data.id , userId :data.userId });
        return item;
        
  }catch (err) {debugger; 
  
    throw err; 
  }
}
module.exports = del;