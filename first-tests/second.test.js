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


const DB_NAME  = "test_db2";
const DROP_DB_AFTER_CLOSE = false;
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
test('delete all', async () => {

            const mongooseModel = await getTcode(DB_NAME).mongooseModel();
            const delete_result = await mongooseModel.deleteMany({});
            expect(delete_result.acknowledged).toBeTruthy();
});

test('should have zero items', async () => {
            const count_result = await getTcode(DB_NAME).count();
            expect(count_result.count).toBe(0);
});


test('add_10_Question', async () => {
    for (let i = 0; i < 10; i++) {
        const addQuestion_result = await getTcode(DB_NAME).addQuestion(DB_NAME,{
            board: "fbise",
            classNo : Math.floor(Math.random() * 50000),
            chapter: Math.floor(Math.random() * 90000)
          }); 
          expect(addQuestion_result.ok).toBeTruthy();
    }

});

test('count should be 10 now', async () => {

  const count_result = await getTcode(DB_NAME).count();
  expect(count_result.count).toBe(10);
});

///////////////////////////////////////////////////////////////////
});