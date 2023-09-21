const { FBISE9th } = require('../models/mathQuestion');

async function setAllFreeFalse() {
  try {
    // Update all documents where 'free' is true and set it to false
    await FBISE9th.updateMany({ free: true }, { $set: { free: false } });
    console.log('Successfully updated all records to free=false');
  } catch (error) {
    console.error('Error updating MathQuestion records:', error);
  }
}

module.exports = setAllFreeFalse;
