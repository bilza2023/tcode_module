const {db,UserSeq,CitySeq,RegionSeq,BusinessSeq,BusinessTypeSeq} = require('./dbSqlite/dbSequalize');

async function t(){
const seqItems = await BusinessSeq.findAll({ where: { businessTypeId: 1, regionId: 1 } });

const list = await seqItems.map(r => r.toJSON());

const count = await BusinessSeq.count({ where: { businessTypeId: 1, regionId: 1 } });

console.log(count);
console.log(list);
}

t();