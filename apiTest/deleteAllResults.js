
const  Result = require('../models/result.js');

async function deleteAllSurveys(){
    await Result.deleteMany({});
    console.log("All Result deleted");
}


module.exports = deleteAllSurveys;