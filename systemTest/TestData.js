const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  userId: {
    type: String,
    required: true
  }
});

const TestData = mongoose.model('TestData', tagSchema);
module.exports = {TestData};