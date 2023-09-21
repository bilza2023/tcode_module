const skillzaErrList = require('../../skillzaaError/skillzaaErrList');

async function runChecks(checks,model,data,backendData){
 try {
    //------Run Checks-----------------
    for (let i = 0; i < checks.length; i++) {
        const check = await checks[i];
        await check( model,data,backendData);
    }
 }catch (err) {
    throw err;
 }
}


module.exports = runChecks;