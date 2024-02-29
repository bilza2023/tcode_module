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


const DB_NAME  = "user";
// Disconnect from the database after running all test cases
afterAll(async () => {
  const mongooseModel = await getTcode(DB_NAME).mongooseModel();
  await mongooseModel.collection.drop();
  await mongoose.connection.close();
});

// Connect to the database before running test cases
beforeAll(async () => {
    await new Promise((resolve, reject) => {
      db.once('open', () => {
        console.log("MongoDb ===> connection established");
        registerTcode([]);//dont give any name still user get registered
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
    // expect(3).toBe(3);
});
test('should have zero items', async () => {

            const count_result = await getTcode(DB_NAME).count();
            expect(count_result.count).toBe(0);
});

test('addUser', async () => {
          const result = await getTcode(DB_NAME).addUser({
              email: "abc@msn.com",
              password: "6544333"
            });
            expect(result.ok).toBeTruthy();
});

test('count should be 1 now', async () => {

  const count_result = await getTcode(DB_NAME).count();
  expect(count_result.count).toBe(1);
});

///////////////////////////////////////////////////////////////////
});