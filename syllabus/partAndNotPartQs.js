const {MathFull} = require("../models/mathFull.js");

async function partAndNotPartQs() {
  try {   
     const documents = await MathFull.find({ chapter: 1 });

    console.log("Documents with part == 0 in MathFull collection:", documents);
  } catch (error) {
    console.error('Error counting documents in MathFull collection:', error);
  }
}

module.exports = partAndNotPartQs;
