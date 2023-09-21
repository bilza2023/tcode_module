please  look at this node.js code


const  runChecks = require('../coreFunctions/runChecks');

async function where(data,opt) {
  try{ 
        debugger
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
        const items = await opt.model.find({ whereItem : whereValue });
      
        return items;
        
  }catch (err) {debugger; 
  
    throw err; 
  }
}
module.exports = where;



At this place
        const whereItem = data.whereItem;
        const whereValue = data.whereValue;
        const items = await opt.model.find({ whereItem : whereValue });

the const whereItem = data.whereItem; is a variable


Question:
i do not get any result from the db where as there are documents present in db. there must be some problem here
        const items = await opt.model.find({ whereItem : whereValue });

