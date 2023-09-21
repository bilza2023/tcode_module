
const  runChecks = require('../coreFunctions/runChecks');

async function where(data,opt) {
  try{ 
        debugger;
         //---RUN CHECKS---AWAIT IS MUST
         await runChecks(
                  opt.readone.checks,
                  opt.model, 
                  data,
                  opt.readone.backendData
          ); 

        //---where  
        const whereItem = data.whereItem;
        const whereValue = data.whereValue;
        const items = await opt.model.find({ [whereItem] : whereValue , "userId" : data.userId });
      
        return items;
        
  }catch (err) {debugger; 
  
    throw err; 
  }
}
module.exports = where;