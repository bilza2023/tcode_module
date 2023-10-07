require('dotenv').config();
const db = require("./mongoDb/mongo.js");
const {MathFull} = require("./models/mathFull.js");
// // const getRegularQData  = require('./admin/getRegularQData.js');
// const checkNewQ = require('./questions/checkNewQ.js');
// // const getCoreQData = require("./question/getCoreQData.js");
// const createNewQSpecial = require("./questions/createNewQSpecial.js");
// const createNewQReg = require("./questions/createNewQReg.js");
// const deleteQ = require("./questions/deleteQ.js");
// const importEqs = require("./questions/importEqs.js");
const {Eqs,Grid} = require('./models/mathFullEmbededSchemas.js');
const Questions = require('./questions/Questions.js');
///////////////////////////////////////////////
///////////////////////////////////////////////
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});

db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    console.log('\x1b[34m%s\x1b[0m' ,"Admin Panel Operations unsecure... ===>>");

    async function run(){
    try {
    
      // const resp = await Questions.CreateQRegGrid('FBISE',99,1,"5.55",999,"i");
      const resp = await Questions.DeleteQ('652184826f6f6a9c75ab19ba');
      console.log(resp);

      // await MathFull.deleteMany({});
      // await Eqs.deleteMany({});
      // await Grid.deleteMany({});


    } catch(error) {
        console.log("final error!",error);
    }
        process.exit(1);
    }

    run();
});

//////////////////////////////////////////////
