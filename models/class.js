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
  tags : {
      type: [String],
    required: false,
    default : []
  },
  userId: {
    type: String,
    required: true
  }
});

const ClassObj = mongoose.model('ClassObj', classObjSchema,'classes');
module.exports = ClassObj;