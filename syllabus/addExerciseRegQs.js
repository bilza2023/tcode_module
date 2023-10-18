const MathFullObj = require('../mathFull/MathFullObj');


//questionType,board,classNo,chapter,exercise,questionNo,part
async function addExerciseReqQs(exercise,chapterNo,exerciseNo,board,classNo){
 
    for (let k = 0; k < exercise.q.length; k++) {
        const q = exercise.q[k];

            for (let l = 0; l <= q; l++) {
                const part = l+1;
                const questionNo = k+1;
                await MathFullObj.CreateQReg(exercise.type,board, classNo,chapterNo,exercise.ex,questionNo,part);
                console.log("Added" ,exercise.ex,"q",questionNo,"part" ,part );
               
            }
    }

}


module.exports = addExerciseReqQs;