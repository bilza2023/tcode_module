

function getTag(data) {
   const tag = { 
        userId : data.userId,
        name : data.name,
        description : data.description || ""
   }
 return tag;   
}

module.exports = getTag;