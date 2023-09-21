
//--This will be changed to take in template and convert to test

function getSurvey(data) {
   const item = data.item;
      item.userId = data.userId;  
      item.title = data.item.title;  
   return item;   
}

module.exports = getSurvey;