const MathFullObj = require('../mathFull/MathFullObj');
const FBISE9thData = require('./FBISE9thData');


async function addExerciseReqQs(){
 try {
    
    for (let i = 0; i < FBISE9thData.chapters.length; i++) {
    const chapter = FBISE9thData.chapters[i];
     
      for (let j= 0; j < chapter.length; j++) {
        const exercise = chapter[j];

        await regQs(exercise,i+1,j+1,FBISE9thData.board,FBISE9thData.classNo);
      }
    }

  } catch (error) {
    console.error('Error inserting MathQuestion records:', error);
  }
}

/////////////////////////////////
async function regQs(exercise,chapterNo,exerciseNo,board,classNo){
 
    for (let k = 0; k < exercise.q.length; k++) {

            for (let l = 0; l <= exercise.q[k]; l++) {
            //if there are 0 parts then the question has no part hence the part == 0
                const part = exercise.q[k]==0? 0 : l+1;
                const questionNo = k+1;
                await MathFullObj.CreateQReg(exercise.type,board, classNo,chapterNo,exercise.ex,questionNo,part);
                console.log("Added" ,exercise.ex,"q",questionNo,"part" ,part );
               
            }
    }

}


module.exports = addExerciseReqQs;