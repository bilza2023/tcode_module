
 function respFail(res,statusCode=500,errorSlug="unknownError", errorMsg="", otherData={} ){ 

res.status(statusCode).json({errorSlug, errorMsg, otherData});
return res;
}

 
module.exports = respFail;