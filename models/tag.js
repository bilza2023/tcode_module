const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classObjSchema = new Schema({
    
  name: {
    type: String,
    required: true,
     unique: true
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

const Tag = mongoose.model('Tag', classObjSchema);
module.exports = Tag;