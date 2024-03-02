/**
 * 
 * This is self contained test for TCode, must never fail.
 * I need a local mosgodb container before this.
 * This will clear the database but if i want i can stop it from afterAll
 *
 */
require('dotenv').config();
const mongoose = require("mongoose");
const db = require("../mongoDb/mongo.js");
const {getTcode,registerTcode} = require("../index.js");


const DB_NAME  = "fbise9math";
const DROP_DB_AFTER_CLOSE = true;
// Disconnect from the database after running all test cases
afterAll(async () => {
    if(DROP_DB_AFTER_CLOSE){
        const mongooseModel = await getTcode(DB_NAME).mongooseModel();
        await mongooseModel.collection.drop();
    }
    await mongoose.connection.close();
});

// Connect to the database before running test cases
beforeAll(async () => {
    await new Promise((resolve, reject) => {
      db.once('open', () => {
        console.log("MongoDb ===> connection established");
        registerTcode([DB_NAME]);
        resolve();
      }).on('error', (error) => {
        console.error("MongoDb connection error:", error);
        reject(error);
      });
    });
});
  
/////======describe
describe('Testing my functions', () => {
//////////////////////////////////////////////////
test('get chapter map', async () => {

            const mdl = await getTcode(DB_NAME);
            const map = await mdl.chapterMap();
            // console.log("map",map);
            expect(typeof map).toBe('object');
            // expect(delete_result.acknowledged).toBeTruthy();
});




///////////////////////////////////////////////////////////////////
});