const AWS = require("aws-sdk");
AWS.config.update({region: 'ap-south-1'});
const docClient = new AWS.DynamoDB.DocumentClient();
const no = (Math.random() * 5000).toString();;
const txt = (Math.random() * 5000).toString();;

async function add(){
const params = {
    TableName: "students",
    Item: {
        _id : `${no}`,
        created_at : `${txt}dcd`
    }
};

docClient.put(params, function(err, data) {
    if (err) {

        return "Unable to add item. Error JSON:";
    } else {
        return "success"
    }
});

}

module.exports = add;
