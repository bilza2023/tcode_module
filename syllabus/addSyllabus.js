const FBISE9thData = require('./FBISE9thData'); // Import your data
const addExercise = require("./addExercise.js")  ;
async function addSyllabus() {
  try {
    debugger;
    for (let i = 0; i < FBISE9thData.chapters.length; i++) {
    const chapter = FBISE9thData.chapters[i];
      for (let j= 0; j < chapter.length; j++) {
        const exercise = chapter[j];
        //  i == chapter number
        //  j == exerciseNumber
        await addExercise(exercise,i+1,j+1,FBISE9thData.board,FBISE9thData.classNo);
      }
    }

  } catch (error) {
    console.error('Error inserting MathQuestion records:', error);
  }
}

// Call the function to insert the data
// insertMathQuestions();
module.exports = addSyllabus;