
  
const  runChecks = require('../coreFunctions/runChecks');

async function read(data,opt) {
  try{ 
        // debugger;
         //---RUN CHECKS---AWAIT IS MUST
         await runChecks(
                  opt.read.checks,
                  opt.model, 
                  data,
                  opt.read.backendData
          );
        //---READONE  --
        //--user id MUST
        const items = await opt.model.find({"userId" : data.userId})
        return items;
        
  }catch (err) {debugger; 
  
    throw err; 
  }
}
module.exports = read;