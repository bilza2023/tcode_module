
const skillzaErrList = require('../../skillzaaError/skillzaaErrList');
////////////////////////////////////////////
/**
 * just use this to extract out data and user-id -->just DATA AND USER_ID what is inside data let the attached functions / newobjdata fn etc worry.
 */
 function getData(req) {
  try {
    const data  =  req.body.data;
    
    if (data == undefined) {
        throw skillzaErrList.getErr("corruptIncommingData");
    }
    
    //--user id
    const userId  = req.user._id;
    if (userId == undefined) {
        throw skillzaErrList.getErr("loginError");
    }else {
        data.userId = userId.toString();
    }
      return data;

  } catch (error) {
    //--if you get this error come to this place and no place else
    throw error;
  }
}

module.exports = getData;
