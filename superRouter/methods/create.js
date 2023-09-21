
  
const  runChecks = require('../coreFunctions/runChecks');

async function create(data,opt) {
  try{ 
        debugger;
         //---RUN CHECKS---AWAIT IS MUST
         await runChecks(
                  opt.create.checks,
                  opt.model, 
                  data,
                  opt.create.backendData
          );
        //---CREATE NEW OBJECT   
        const newObjData = opt.create.getNewObjDataFn(data); 
        let item = opt.model( newObjData );     
        await item.save();
        return item
        
  }catch (err) {//debugger; 
    throw err; 
  }
}
module.exports = create;