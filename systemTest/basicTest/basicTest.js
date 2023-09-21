const {TestData} = require('../TestData');
//--
const getNewTagData =  require('./getData');
const SuperRouterOptions = require('../../superRouter/superRouterOptions.js');
const errorOther =  require('./errorOther');
const errorSkillzaa =  require('./errorSkillzaa');

/////////////////--From The Super Router//////////////////////
const create = require('../../superRouter/methods/create');
const del = require('../../superRouter/methods/delete');
const read = require('../../superRouter/methods/read');
const readone = require('../../superRouter/methods/readone'); 
const update = require('../../superRouter/methods/update');

// const catchFn = require('../../superRouter/coreFunctions/catchFn');
//////////////////////////////////////////////////////////////
//--we are going to skip SuperRouter and thus skip req,res;
////////////////////////////////////////////////
 const opt = new SuperRouterOptions();
    opt.model = TestData;
    opt.create.getNewObjDataFn = getNewTagData;
    opt.create.checks = [
        // errorOther,
        // errorSkillzaa
    ];
    opt.create.backendData = {       
            checkMaxValue : 100       
    };

////////////////////////////////////////////////

async function basicTest( ){
    const userId='64202224fd8518cb214bd138';
    
console.log('\x1b[33m%s\x1b[0m',"==========================================");
console.log('\x1b[33m%s\x1b[0m','Base Test');
console.log('\x1b[33m%s\x1b[0m',"==========================================");
console.log('\x1b[34m%s\x1b[0m',"All 5 routes");
    //////////////////////////////////////////////////////////
    try{
    
    // Each method takes data,opt . just insert data into data
    const itemCreated = await create({name: "Random Name" , description :'Random Description',userId},opt);
    console.log('\x1b[32m%s\x1b[0m',"itemCreated" , itemCreated._id);

    //--update needs item..
    const itemUpdated = await update({item :itemCreated ,userId},opt);
    console.log('\x1b[32m%s\x1b[0m', "itemUpdated" , itemUpdated._id);

    const itemRead = await read({userId},opt);
    console.log('\x1b[32m%s\x1b[0m',"itemRead" , itemRead.length);

    const itemReadone = await readone({id :itemCreated._id,userId },opt);
    console.log('\x1b[32m%s\x1b[0m',"itemReadone" , itemReadone._id);
    
    const itemDeleted = await del({id :itemCreated._id,userId  },opt);
    console.log('\x1b[32m%s\x1b[0m',"itemDeleted" , itemDeleted);

   console.log('\x1b[34m%s\x1b[0m', 'Base Test Ended..===>>');
   
   }catch (e) {
    
        if (e.type == 'skillzaaError'){
        //--skillzaa error
        console.log('\x1b[31m%s\x1b[0m',e.message );
        }else {
        //system failure
        console.log('\x1b[31m%s\x1b[0m','system failure' );
        }

   }

} 
///////////////////////////////////////////////////
module.exports = basicTest
///////////////////////////////////////////////////
