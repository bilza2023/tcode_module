


async function deleteAllSurveys(Survey){
    await Survey.deleteMany({});
    console.log("All surveys deleted");
}


module.exports = deleteAllSurveys;