const MathFullObj = require('../mathFull/MathFullObj');


async function addExercise(exercise,chapterNo,exerciseNo,board,classNo){
console.log("exercise",exercise);

    for (let k = 0; k < exercise.q.length; k++) {
        const q = exercise.q[k];
        if(q == 0){
            // questionType = "eqs" since it does not matter for now
            //questionNo = k
            await MathFullObj.CreateQReg('eqs',board,classNo,chapterNo,exercise.ex,k+1,0);
        }else {
            for (let l = 0; l < q; l++) {
                const part = l+1;
                await MathFullObj.CreateQReg('eqs',board,classNo,chapterNo,exercise.ex,k+1,l+1);
            }
        
        }
        
    }

}


module.exports = addExercise;