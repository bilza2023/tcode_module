require('dotenv').config();
const path = require('path');
const db = require("./mongoDb/mongo.js");
const { MathFull } = require("./mathFull/mathFull.js");

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});

db.once('open', () => {
  console.log("MongoDb ===> connection established");

  async function run() {
    const options = { new: false, upsert: false };
    const questions = await MathFull.find();

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      question.status = 'fill';
    await MathFull.findByIdAndUpdate(question._id,question, options);
    console.log(i);
    } 
    
    console.log("done..");
    process.exit(1);
  }

  run();
});
