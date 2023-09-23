require('dotenv').config();
const db = require("./mongoDb/mongo.js");
// const runTests = require("./systemTest/testRunner.js");
const {FBISE9th} = require("./models/mathQuestion.js");
///////////////////////////////////////////////
///////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    console.log('\x1b[34m%s\x1b[0m' ,"api Base Test testing CRRUD... ===>>");

    async function run(){
        try {
            const res = await FBISE9th.updateMany({ status: 'fill' }, { $set: { filledBy: 'mustafa@gmail.com' } });
            console.log("FBISE9th documents updated");
        } catch (err) {
        console.error(err);
        }
        process.exit(1);
    }

    run();
});

//////////////////////////////////////////////
