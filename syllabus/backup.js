const fs = require('fs');
const path = require('path');
const { MathFull } = require('../models/mathFull.js');

// Function to backup documents from a collection
async function backup(backupFolder = "./backup") {
  try {
  const collection = await MathFull.find({});

    // Create the backup folder if it doesn't exist
    if (!fs.existsSync(backupFolder)) {
      fs.mkdirSync(backupFolder, { recursive: true });
    }

    // Iterate through each item in the collection
    for (const item of collection) {
      // Define the file path for the item
      const filePath = path.join(backupFolder, `${item.filename}.json`);

      // Serialize the item to JSON using the MathFull schema
      const serializedItem = JSON.stringify({
  board: item.board,
  classNo: item.classNo,
  chapter: item.chapter,
  isSpecial: item.isSpecial,
  partNo: {
    exercise: item.partNo.exercise,
    questionNo: item.partNo.questionNo,
    part: item.partNo.part,
    name: item.partNo.name, // if isSpecial is true, this will be present
  },
  teacherComments: item.teacherComments,
  adminComments: item.adminComments,
  questionType: item.questionType,
  status: item.status,
  free: item.free,
  filename: item.filename,
  filledBy: item.filledBy,
  eqs: item.eqs,
  grid: item.grid,
}, null, 2);

      // Write the JSON data to the file
      fs.writeFileSync(filePath, serializedItem);

      console.log(`Backup complete for ${item.filename}`);
    }

    console.log('Backup process completed successfully.');
  } catch (error) {
    console.error('Error while backing up collection:', error);
  }
}

module.exports = backup;