


async function respOk(res, msg="", additionalData={}) {

  const responseObject = { msg, errorcode: null, errormsg: null,
  errorSlug :null, ...additionalData };
  
  res.status(200).json(responseObject);
  return res;
}


module.exports = respOk;