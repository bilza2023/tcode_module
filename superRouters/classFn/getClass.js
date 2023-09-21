

function getClass(data){
     const cls = { 
        userId : data.userId,
        name : data.item.name,
        description : data.item.description || ""
   }
 return cls;   

}

module.exports = getClass;