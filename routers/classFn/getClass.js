

function getClass(data){
     const cls = { 
        userId : data.userId,
        name : data.name,
        description : data.description || ""
   }
 return cls;   

}

module.exports = getClass;