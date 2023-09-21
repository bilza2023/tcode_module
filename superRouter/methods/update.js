
  
const  runChecks = require('../coreFunctions/runChecks');

async function update(data,opt) {
  try{ 
        debugger;
         //---RUN CHECKS---AWAIT IS MUST
         await runChecks(
                  opt.update.checks,
                  opt.model, 
                  data,
                  opt.update.backendData
          );
      const options = { new: true, upsert: true }; 
      const item = await opt.model.findByIdAndUpdate( data.item._id , data.item,options);
      
        return item
        
  }catch (err) {
  // debugger; 
  
    throw err; 
  }
}
module.exports = update;