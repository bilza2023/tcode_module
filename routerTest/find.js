const {Test} = require("../models/survey/survey");
const respFail = require('../common/respFail');

async function find(req, res){
     try {
    // debugger;
    const user= req.user;
    // const userId  = user._id;
    const id= req.body.quizId;
    const incommingQuiz = await Test.findById(id);
      if (incommingQuiz){
        const incommingMembers = user.members;
        return res.status(200).json({ incommingQuiz, incommingMembers, status:"ok" });
      }else {
        return respFail(res,"Item not found" , "ItemNotFound");
      }
  }catch(error) {
    // return res.status(400).json({msg : "failure" , error  });
    const r = await respFail(res,"unknown error","unknownError");
    return r;
  }

}

module.exports = find;