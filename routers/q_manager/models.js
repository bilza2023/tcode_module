const mongoose = require('mongoose');
const QuestionSchema = require('./questionSchema/QuestionSchema');

//This is where we can change the table/collection name
// const MathFulls = mongoose.model('MathFulls', );
const MathFull = mongoose.model('MathFull', QuestionSchema);

module.exports = {MathFull}