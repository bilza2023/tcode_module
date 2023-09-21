const { FBISE9th } = require('../models/mathQuestion');
const FBISE9thData = require('./FBISE9th'); // Import your data

async function insertMathQuestions() {
  try {
    for (let i = 0; i < FBISE9thData.chapters.length; i++) {
      const chapter = FBISE9thData.chapters[i];

      for (let j = 0; j < chapter.length; j++) {
        const exercise = chapter[j];
        const exerciseName = exercise.ex;
        const questions = exercise.q;

        for (let k = 0; k < questions.length; k++) {
          const questionParts = questions[k];
          const numberOfParts = questionParts;

          for (let part = 1; part <= numberOfParts; part++) {
            const question = {
              board: FBISE9thData.board,
              class: FBISE9thData.class,
              chapter: i + 1,
              exercise: exerciseName,
              questionNo: k + 1,
              part: part,
              status: 'empty', // You can set the status as needed
              free: true, // You can set the free property as needed
            };

            question.filename = `${question.board.toLowerCase()}_cl_${question.class}_ch_${question.chapter}_ex_${question.exercise}_q_${question.questionNo}_pt_${question.part}`;

            await FBISE9th.create(question);
            console.log(`${question.filename} inserted successfully.`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error inserting MathQuestion records:', error);
  }
}

// Call the function to insert the data
// insertMathQuestions();
module.exports = insertMathQuestions;