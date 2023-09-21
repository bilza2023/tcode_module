
 
function respOk(res,msg="",additionalData={},statusCode=200) {

  const responseObject = { msg, ...additionalData };
  
  res.status(statusCode).json(responseObject);
  return res;
}


module.exports = respOk;