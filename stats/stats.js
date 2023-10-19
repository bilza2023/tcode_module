
const MathFullObj = require('../mathFull/MathFullObj');
const {MathFull} = require('../mathFull/mathFull');

async function stats(){
try {
    const totalQuestions = await MathFullObj.Count({});
    console.log("Total Questions :", totalQuestions.count);
    
    const totalEqs = await MathFullObj.Count({questionType : "eqs"});
    console.log("Total Eqs :", totalEqs.count);
    
    const someActivity = await MathFull.countDocuments({ 'eqs': { $exists: true, $not: { $size: 0 } } });

    console.log("Questions not final but has some activity in eqs field:", someActivity);

} catch (error) {
console.error('Error Stats', error);
}
}

module.exports = stats;