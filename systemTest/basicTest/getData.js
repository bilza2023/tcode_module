

function getData(data) {
   const r = { 
        userId : data.userId, //must for evey item
        name : data.name,//dummy just for test item
        description : data.description || "" //dummy just for test item
   }
 return r;   
}

module.exports = getData;