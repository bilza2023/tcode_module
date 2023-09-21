

function getStudent(data){
     const cls = { 
        id : data.id,
        userId : data.userId,
        name : data.name
   }
 return cls;   

}

module.exports = getStudent;