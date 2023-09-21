const mongoose = require('mongoose');
const { svyQuestionSchema } = require('./svyQuestion');
const { publishObjSchema } = require('./publishObj');

const SurveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  saveResponse: {
    type: Boolean,
    default: true,
  },
  showIntro: {
    type: Boolean,
    default: true,
  },
  introText: {
    type: String,
    default: 'Welcome',
  },
  showResult: {
    type: Boolean,
    default: true,
  },
  showfarewellText: {
    type: Boolean,
    default: true,
  },
  farewellText: {
    type: String,
    default: 'Goodbye',
  },
  classId: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  members: {
    type: [String],
  },
  marks: {
    type: Number,
    required: true,
    default: 10,
  },
  questions: {
    type: [svyQuestionSchema],
  },
  publishObj: {
    type: publishObjSchema,
  },
  tags: {
    type: [String],
  },
  displayQOneByOne: {
    type: Boolean,
    default: false,
  },
  private: {
    type: Boolean,
    default: true,
  },
});

const Run = mongoose.model('Run', SurveySchema);
const Test = mongoose.model('Test', SurveySchema);

module.exports = { Run, Test };
