const AWS = require("aws-sdk");
// AWS.config.update({region: 'ap-south-1'});
AWS.config.update({
  accessKeyId: 'AKIAW3MEEG36RPZN4V7S',
  secretAccessKey: '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',
  region: 'ap-south-1'
});
const docClient = new AWS.DynamoDB.DocumentClient();

///////////////////////////////////////////
async function add(){
try{
const no = (Math.random() * 5000).toString();;
const txt = (Math.random() * 5000).toString();;
const params = {
    TableName: "students",
    Item: {
        _id : `${no}`,
        created_at : `${txt}dcd`
    }
};

await docClient.put(params, function(err) {
    if (err) {

        return "Unable to add item. Error JSON:";
    } else {
        return `success -Added ${no} and ${txt}`
    }
});

}catch(e){
console.log(e);
}

}

module.exports = add;
