
const Result =  require('../../models/result');



async function deleteAllResults(mdl,data,backendData){

    const id = data.id; 
    await Result.deleteMany({runId :id});
    // const rez = await Result.deleteMany({runId :id});
    //   console.log(rez);

}

module.exports = deleteAllResults;