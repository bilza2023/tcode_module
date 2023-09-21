
const  createNewFunction = require('../../routerTemplate/createNew/createNewFunction'); 


async function createNew(){

await createNewFunction("From Zion" , '64202224fd8518cb214bd138');
console.log("New Template Created")
}

module.exports = createNew;