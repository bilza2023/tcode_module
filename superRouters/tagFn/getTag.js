

function getTag(data) {
   const tag = { 
        userId : data.userId,
        name : data.item.name,
        description : data.item.description || ""
   }
 return tag;   
}

module.exports = getTag;