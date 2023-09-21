const mongoose = require('mongoose');

const publishObjSchema = new mongoose.Schema({
  publishTechnique: { //move this to Test leter
    type: String,
    enum: ["now", "at" , "after"],
    required: false,
  },
  unpublishTechnique: { //move this to Test leter
    type: String,
    enum: ["never" , "after"],
    required: false,
  },
  publishDate: { //move this to Test leter
    type: Date,
    required: false,
  },
  hour: { //move this to Test leter
    type: Number,
    required: false,
    default : 0
  },
  min: { //move this to Test leter
    type: Number,
    required: false,
    default : 0
  },
  unpublishHour: { //move this to Test leter
    type: Number,
    required: false,
    default : 0
  },
  unpublishMin: { //move this to Test leter
    type: Number,
    required: false,
    default : 0
  },
  runStartTime: {
    type: Date,
    required: false,
    default: null //dont add it unless RUN time
  }
});

const PublishObj = mongoose.model('PublishObj', publishObjSchema);

module.exports = {PublishObj , publishObjSchema};
