

  function retRes(err,res) {
  if (err.type == 'skillzaaError'){
      return res.status(err.statusCode || 500)
          .json(err.getJson()); 
    }else {
      return res.status(500).json({message:"process failure"}); 
    }
  }

  module.exports = retRes;