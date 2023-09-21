

async function respFail(res ,errormsg,errorSlug="",errorcode=0){
res.status(400).json({ msg:null , errorcode , errorSlug,errormsg});
return res;
}


module.exports = respFail;