
const {Template} = require("../../models/survey/survey");
const skillzaErrList = require('../../mongoWrapper/skillzaaError/skillzaaErrList');

async function find(id) {
  try {
    const originalQuiz = await Template.findById(id);
    if (!originalQuiz) {
      throw skillzaErrList.getErr("itemNotFound");
    }else {
        return true;
    }

  } catch (error) {
    throw skillzaErrList.getErr("itemNotFound");
  }
}

module.exports = find;