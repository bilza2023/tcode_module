const FBISE9thData = require('./FBISE9thData'); // Import your data
const addExerciseSpecialQs = require('./addExerciseSpecialQs');
const addExerciseRegQs = require("./addExerciseRegQs.js")  ;

async function addSyllabus() {
//  await regQs();
 await addExerciseSpecialQs();
}

//////////////////////////////
async function regQs(){
 try {
    // debugger;
    for (let i = 0; i < FBISE9thData.chapters.length; i++) {
    const chapter = FBISE9thData.chapters[i];
     
      for (let j= 0; j < chapter.length; j++) {
        const exercise = chapter[j];

        await addExerciseRegQs(exercise,i+1,j+1,FBISE9thData.board,FBISE9thData.classNo);
      }
    }

  } catch (error) {
    console.error('Error inserting MathQuestion records:', error);
  }
}
//////////////////////////////


module.exports = addSyllabus;