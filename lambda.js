var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAW3MEEG36RPZN4V7S',
  secretAccessKey: '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',
  region: 'ap-south-1'
});

async function invoke(){
var lambda = new AWS.Lambda();

var params = {
  FunctionName: 'first',
  Payload: JSON.stringify({message : 'I am fine'})
};

lambda.invoke(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else     console.log(data, "====>");
});
}


module.exports = invoke;