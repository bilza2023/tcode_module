require('dotenv').config();
const path = require('path');
const db = require("./mongoDb/mongo.js");
const fs = require('fs');
const { MathFull } = require("./mathFull/mathFull.js");

////////////////////////
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});
////////////////////////
db.once('open', () => {
  console.log("MongoDb ===> connection established");

  async function run() {
    const questions = await  getSyllabus();
    // console.log("questions", questions);
     const jsonQuestions = JSON.stringify(questions, null, 2);

    // Write the JSON string to a file
    fs.writeFile('syllabus.json', jsonQuestions, (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  }//run ends

  run();
});


///////////////////////
async function getSyllabus() {
  try {
 const questions = await MathFull.find({ status: "final" }).select({
      classNo: 1,
      chapter: 1,
      board: 1,
      isSpecial: 1,
      partNo: 1,
      questionType: 1,
      status: 1,
      // free: 1,
      filename: 1,
      filledBy:1
    });

    return questions;
  } catch (error) {
    return { ok: false, message: "failed to get syllabus" };
  }
}