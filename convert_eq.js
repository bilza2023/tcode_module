require('dotenv').config();
// const fs = require('fs');
const path = require('path');
const db = require("./mongoDb/mongo.js");

// const MathFullObj = require("./mathFull/MathFullObj.js");
const {MathFull} = require("./mathFull/mathFull.js");
///////////////////////////////////////////////
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});


db.once('open',()=> {
    console.log("MongoDb ===> connection established");

async function run(){
 const options = { new: false, upsert: false };
//  debugger;
        // let i = 4;
        for (let i = 4; i < ids.length; i++) {
        ///////////////////////////////////////////////////////
        let question = await MathFull.findById(ids[i]);
        if (!question){return; }
        const eqs = question.eqs;
        ///////////////////////////////////////////////////////
        const slide = {
            startTime : 0,
            endTime :0,
            type : 'Eqs',
            template : '',
            version : '0.0.0',
            items : [],    
            slideExtra : [],    
        }; 
///////////////////////////////////////////////////////
        for (let j = 0; j < eqs.length; j++) {
            const eq = eqs[j];
            const item =   {name: '' , content : '' , extra : {
                type : eq.type,
                step : eq.step,
                code : eq.code,
                startTime : eq.eqStartTime,
                endTime : 500,
                fsStartTime : null,
                fsEndTime : null,
                sp: eq.sp,
                fs: eq.fs,
        }}; //ends item and item.extra

        slide.items.push(item);
        }//for
   
    /////////////////
const slides = [];
slides.push(slide);
question.slides = slides;

await MathFull.findByIdAndUpdate(question._id, question, options);

} //outer for

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

console.log("done..");
process.exit(1);
} // run ends

    run();
});

const ids = [
        "653113340a6eaa163e9f89d0",
        "653113350a6eaa163e9f89d6",
        "653113350a6eaa163e9f89dc",
        "653113360a6eaa163e9f89e2",
        "653113370a6eaa163e9f89e8",
        "653113370a6eaa163e9f89ee",
        "653113380a6eaa163e9f89f4",
        "653113380a6eaa163e9f89fa",
        "653113390a6eaa163e9f8a00",
        "6531133a0a6eaa163e9f8a06",
        "6531133a0a6eaa163e9f8a0c",
        "6531133b0a6eaa163e9f8a12",
        "6531133c0a6eaa163e9f8a18",
        "6531133c0a6eaa163e9f8a1e",
        "6531133d0a6eaa163e9f8a24",
        "6531133e0a6eaa163e9f8a2a",
        "6531133e0a6eaa163e9f8a30",
        "6531133f0a6eaa163e9f8a36",
        "653113400a6eaa163e9f8a3c",
        "653113400a6eaa163e9f8a42",
        "653113410a6eaa163e9f8a48",
        "653113410a6eaa163e9f8a4e",
        "653113420a6eaa163e9f8a54",
        "653113430a6eaa163e9f8a60",
        "653113440a6eaa163e9f8a66",
        "6531134a0a6eaa163e9f8aa2",
        "6531134b0a6eaa163e9f8aa8",
        "6531134b0a6eaa163e9f8aae",
        "6531134c0a6eaa163e9f8ab4",
        "6531134d0a6eaa163e9f8aba",
        "6531134d0a6eaa163e9f8ac0",
        "6531134e0a6eaa163e9f8ac6",
        "6531134e0a6eaa163e9f8acc",
        "6531134f0a6eaa163e9f8ad2",
        "653113500a6eaa163e9f8ad8",
        "653113500a6eaa163e9f8ade",
        "653113510a6eaa163e9f8ae4",
        "653113510a6eaa163e9f8aea",
        "653113530a6eaa163e9f8af6",
        "653113530a6eaa163e9f8afc",
        "653113540a6eaa163e9f8b02",
        "653113550a6eaa163e9f8b08",
        "653113550a6eaa163e9f8b0e",
        "653113560a6eaa163e9f8b14",
        "653113560a6eaa163e9f8b1a",
        "653113590a6eaa163e9f8b32",
        "653113590a6eaa163e9f8b38",
        "6531135a0a6eaa163e9f8b3e",
        "6531135b0a6eaa163e9f8b44",
        "6531135c0a6eaa163e9f8b50",
        "6531135d0a6eaa163e9f8b56",
        "6531135e0a6eaa163e9f8b62",
        "6531135e0a6eaa163e9f8b68",
        "653113600a6eaa163e9f8b74",
        "653113600a6eaa163e9f8b7a",
        "653113610a6eaa163e9f8b86",
        "653113620a6eaa163e9f8b8c",
        "653113630a6eaa163e9f8b92",
        "653113630a6eaa163e9f8b98",
        "653113640a6eaa163e9f8b9e",
        "653113650a6eaa163e9f8ba4",
        "653113650a6eaa163e9f8baa",
        "653113660a6eaa163e9f8bb0",
        "653113670a6eaa163e9f8bbc",
        "653113690a6eaa163e9f8bc8",
        "653113690a6eaa163e9f8bce",
        "6531136b0a6eaa163e9f8be0",
        "6531136c0a6eaa163e9f8be6",
        "653113710a6eaa163e9f8c16",
        "653113a10a6eaa163e9f8dea",
        "653113a20a6eaa163e9f8df0",
        "653113a20a6eaa163e9f8df6",
        "653113a30a6eaa163e9f8dfc",
        "653113a40a6eaa163e9f8e02",
        "653113a70a6eaa163e9f8e20",
        "653113a80a6eaa163e9f8e2c",
        "653113ed0a6eaa163e9f90c6",
        "653113ee0a6eaa163e9f90cc",
        "653113ee0a6eaa163e9f90d2",
        "653113ef0a6eaa163e9f90d8",
        "653113f00a6eaa163e9f90de",
        "653113f00a6eaa163e9f90e4",
        "653113f10a6eaa163e9f90f0",
        "653113f20a6eaa163e9f90f6",
        "653113f30a6eaa163e9f90fc",
        "653113f30a6eaa163e9f9102",
        "653113f50a6eaa163e9f910e",
        "653113f50a6eaa163e9f9114",
        "653113f60a6eaa163e9f911a",
        "653113f60a6eaa163e9f9120",
        "653113f70a6eaa163e9f9126",
        "653113f80a6eaa163e9f912c",
        "653113f90a6eaa163e9f9138",
        "653113fa0a6eaa163e9f913e",
        "653113fa0a6eaa163e9f9144",
        "653113fb0a6eaa163e9f914a",
        "653113fc0a6eaa163e9f9150",
        "653113fc0a6eaa163e9f9156",
        "653113fd0a6eaa163e9f9162",
        "653113fe0a6eaa163e9f9168",
        "653113ff0a6eaa163e9f916e",
        "653113ff0a6eaa163e9f9174",
        "653114000a6eaa163e9f9180",
        "653114010a6eaa163e9f9186",
        "653114020a6eaa163e9f918c",
        "653114020a6eaa163e9f9192",
        "653114060a6eaa163e9f91b6",
        "65433526bca9577fd75eaa9c",
        "65433528bca9577fd75eaaa0",
        "65433529bca9577fd75eaaa4",
        "6543352bbca9577fd75eaaa8",
        "6543352cbca9577fd75eaaac",
        "6543352ebca9577fd75eaab0",
        "65433530bca9577fd75eaab4",
        "65433539bca9577fd75eaab8",
        "6543353bbca9577fd75eaabc",
        "6543353ebca9577fd75eaac4",
        "6543353fbca9577fd75eaac8",
        "65433541bca9577fd75eaacc",
        "65433543bca9577fd75eaad0",
        "65433544bca9577fd75eaad4",
        "65433546bca9577fd75eaad8",
    ];
