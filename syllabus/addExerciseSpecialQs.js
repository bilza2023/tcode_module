const MathFullObj = require('../mathFull/MathFullObj');
const FBISE9thDataSpecial = require('./FBISE9thDataSpecial'); // Import your data

// CreateQSpecial(questionType,board,classNo,chapter,name,exercise="")
async function addExerciseSpecialQs(){

    for (let k = 0; k < FBISE9thDataSpecial.qs.length; k++) {
     const q = FBISE9thDataSpecial.qs[k];
        await MathFullObj.CreateQSpecial(
            q.type,
            FBISE9thDataSpecial.board, 
            FBISE9thDataSpecial.classNo,
            q.chapter,
            q.name, 
            q.exercise); 
            console.log("Added" ,q.ex,"name",q.name);
               
    }
}


module.exports = addExerciseSpecialQs;