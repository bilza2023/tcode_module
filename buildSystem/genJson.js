const MathFullObj = require('../mathFull/MathFullObj')
const fs = require('fs');

async function genJson(){

    // const r = await MathFullObj.Where({isSpecial : true});
    const r = await MathFullObj.Get('653113340a6eaa163e9f89d0');
      const jsonData = JSON.stringify(r, null, 2);

    // Write the JSON data to a file named 'output.json'
    fs.writeFileSync('output.json', jsonData);
    // console.log("Count",r);

}


module.exports =  genJson;