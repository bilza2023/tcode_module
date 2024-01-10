require('dotenv').config();
const path = require('path');
const db = require("./mongoDb/mongo.js");
const { MathFull } = require("./mathFull/mathFull.js");
const { fbise9math } = require("./routers/q_manager/questionSchema/QuestionSchema.js");

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});

db.once('open', () => {
  console.log("MongoDb ===> connection established");

  async function run() {
    const options = { new: true, upsert: true };
    const questions = await MathFull.find({});

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
        const newQuestion = {
            board: question.board, 
            classNo: question.classNo,
            chapter: question.chapter,
            exercise: question.partNo.exercise,
            questionNo: question.partNo.questionNo || 0, //optional
            part: question.partNo.part || 0, //optional
            // name: question.name || '', //optional
            sortOrder: 0, //sort Order
            questionType: 'paid',
            status: question.status,
            filename: question.filename,
            filledBy: '',
            slides: question.slides,
            teacherComments: '',
            adminComments: '',
        };
      const newQ = await fbise9math.create(newQuestion);  
      console.log('created',i);
    } 
    
    console.log("done..");
    process.exit(1);
  }

  run();
});
