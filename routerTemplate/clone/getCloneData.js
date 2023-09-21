//--14-6-2023 : Code review. found correct use of respOk and respFail (you have to return it these fn do not return it for you). aapConfig is used instead of .env since it is easy to pass with code.

const skillzaErrList = require('../../common/skillzaaError/skillzaaErrList');
////////////////////////////////////////////
async function getCloneData (req) {
 try {
   const id = req.body.id;//error
   const userId  = req.user._id;
   const title = req.body.title;//error
  //  debugger;
   if ( id === undefined || title === undefined || userId === undefined){throw new Error("ok");}
    return {title,userId,id};

  } catch (error) {
    throw skillzaErrList.getErr("corruptIncommingData");
  }
}




///////////////////////////////
module.exports  = getCloneData;
