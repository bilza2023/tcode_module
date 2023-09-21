
const  runChecks = require('../coreFunctions/runChecks');

async function readone(data,opt) {
  try{ 
        // debugger;
         //---RUN CHECKS---AWAIT IS MUST
         await runChecks(
                  opt.readone.checks,
                  opt.model, 
                  data,
                  opt.readone.backendData
          );
        //---READONE  
         const item = await opt.model.findById(data.id);
      
        return item;
        
  }catch (err) {debugger; 
  
    throw err; 
  }
}
module.exports = readone;