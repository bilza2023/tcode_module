
const {Template} = require("../../models/survey/survey");
// const skillzaErrList = require('../../common/skillzaaError/skillzaaErrList');
const skillzaErrList = [];

async function clone(id,title) {
  try {
    //fol line can be removed if oriqnalQuiz is passed as argument.
    const originalQuiz = await Template.findById(id); 
    const template = new Template(originalQuiz.toObject());
    template._id = undefined;// userId is already set
    template.published = false; //important
    template.members = []; //important
    template.isNew = true;
    template.title = title; //--new title
    template.createdAt = Date.now();

    await template.save();
    return  template;

  } catch (error) {
    throw skillzaErrList.getErr("failedToCreateNew");
  }
}

module.exports = clone;