require('dotenv').config();
const path = require('path');
const mongoose = require("mongoose");
const db = require("./mongoDb/mongo.js");
const TCodeSchema = require('./tCodeModule/TCodeSchema.js');
const fbise9math = mongoose.model('fbise9math', TCodeSchema);


db.once('open', async () => {
  console.log("MongoDb ===> connection established");
  await run();
});

//////////////////////////////////////
async function run() {
  // const options = { new: false, upsert: false };
  // Define a model without a strict schema
  // const fbise9math = mongoose.model('fbise9math', new mongoose.Schema({}, { strict: false }));
  const documents = await fbise9math.find({});
  console.log(documents);

  // const result = await fbise9math.deleteMany({ slides: { $size: 0 } });
  // console.log(`${result.deletedCount} document(s) deleted`);
  const result = await fbise9math.updateMany({}, { $set: { board: "fbise" } });
  console.log(`${result.modifiedCount} document(s) updated`);
}


async function getFilename(question,tcode){
  let filename = tcode;

  if (question.chapter){    
    filename +=  `_ch_${question.chapter}`
  }
  if (question.exercise){    
    filename +=  `_ex_${question.exercise}`
  }
  if (question.questionNo){    
    filename +=  `_q_${question.questionNo}`
  }
  if (question.part){    
    filename +=  `_pt_${question.part}`
  }
  if (question.name){    
    filename +=  `_n_${question.name}`
  }
  ////////////////////////////////////
  question.filename = filename;
  ////////////////////////////////////

  }