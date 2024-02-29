require('dotenv').config();
const mongoose = require("mongoose");
const TCodeSchema = require('./tCodeModule/TCodeSchema.js'); 
const TCode = require("./tCodeModule/TCode.js");
const db = require("./mongoDb/mongo.js");
// const testModel = mongoose.model('test', TCodeSchema);
// const test = new TCode(testModel);
// const fbiseModel = mongoose.model('fbise9math', TCodeSchema);
// const fbise9math = new TCode(fbiseModel);

db.once('open',async ()=> {
    console.log("MongoDb ===> connection established")
    const chapters = await TCode.get("fbise9math").getUniqueChapters();
    console.log("chapters" , chapters);
    
});







