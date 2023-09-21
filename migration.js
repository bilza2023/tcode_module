const {UserSeq,RegionSeq,CitySeq,BusinessSeq,BusinessTypeSeq} = require('./dbSqlite/dbSequalize');


const createUsers = async ()=>{
const password  = "$2b$04$14UoBguWzN7VVDxtMWZTDuzDz8e80GZjMz63tQnbAV03gEnYzWg.K"; 
const data = [
  {id : 1 , email : "super@user.com" , password  ,accountType : "superuser"},
  {id : 2 , email : "user@gmail.com" , password },
];
await UserSeq.bulkCreate(data);
}
const createBusinessTypes = async ()=>{
const data = [
    {id : 1 , name : "plumber"},
    {id : 2 , name : "electrition"},
    {id : 3 , name : "tutor"},
    {id : 4 , name : "mali"},
];
await BusinessTypeSeq.bulkCreate(data);
}
const createBusiness = async ()=>{
const data = [
{id : 1 , userId:1, name : "great business" ,number: "3483" , regionId:1, businessTypeId:1 },
{id : 2 ,  userId:1, name : "business" ,number: "54641" , regionId:1, businessTypeId:2},
{id : 3 , userId:1, name : "business great" ,number: "321321" , regionId:1, businessTypeId:3},
{id : 4 , userId:1, name : "great great business" ,number: "987654" , regionId:1, businessTypeId:1},

];

// await Business.bulkCreate(data);
const business = await BusinessSeq.bulkCreate(data,{
  include: [Region, BusinessType]
});

}
const createCities = async () => {
const citiesData = [
    { "id" : 1, "name" : "Islamabad"},
    { "id" : 2, "name" : "Rawalpindi" },
    { "id" : 3, "name" : "Lahore"},
    { "id" : 4, "name" : "Karachi"},
    { "id" : 5, "name" : "Multan"},
    // { "id" : 6, "name" : "Hyderabad"},
    // { "id" : 7, "name" : "Gujranwala"},
    // { "id" : 8, "name" : "Peshawar"},
    // { "id" : 9, "name" : "Quetta"},
    // { "id" : 10, "name" : "Faisalabad"},
    // { "id" : 11, "name" : "Sargodha"},
    // { "id" : 12, "name" : "Sialkot"},
    // { "id" : 13, "name" : "Bahawalpur"},
    // { "id" : 14, "name" : "Sukkur"},
    // { "id" : 15, "name" : "Jhang"},
    // { "id" : 16, "name" : "Sheikhupura"},
    // { "id" : 17, "name" : "Larkana"},
    // { "id" : 18, "name" : "Gujrat"},
    // { "id" : 19, "name" : "Mardan"},
    // { "id" : 20, "name" : "Dera Ghazi Khan"},
    // { "id" : 21, "name" : "Sahiwal"},
    // { "id" : 22, "name" : "Nawabshah"},
    // { "id" : 23, "name" : "Mingora"},
    // { "id" : 24, "name" : "Okara"},
    // { "id" : 25, "name" : "Mirpur Khas"},
    // { "id" : 26, "name" : "Chiniot"},
    // { "id" : 27, "name" : "Kasur"},
    // { "id" : 28, "name" : "Rahim Yar Khan"},
    // { "id" : 29, "name" : "Jhelum"},
    // { "id" : 30, "name" : "Kamoke"},
    // { "id" : 31, "name" : "Hafizabad"},
    // { "id" : 32, "name" : "Mandi Bahauddin"},
    // { "id" : 33, "name" : "Khanewal"},
    // { "id" : 34, "name" : "Sadiqabad"},
    // { "id" : 35, "name" : "Bhakkar"},
    // { "id" : 36, "name" : "Jacobabad"},
    // { "id" : 37, "name" : "Shikarpur"},
    // { "id" : 38, "name" : "Muzaffargarh"},
    // { "id" : 39, "name" : "Khuzdar"},
    // { "id" : 40, "name" : "Chaman"},
    // { "id" : 41, "name" : "Wah Cantonment"},
    // { "id" : 42, "name" : "Mianwali"},
    // { "id" : 43, "name" : "Khairpur"},
    // { "id" : 44, "name" : "Attock"},
    // { "id" : 45, "name" : "Mandi"},
    // { "id" : 46, "name" : "Tando Allahyar"},
    // { "id" : 47, "name" : "Kotri"},
    // { "id" : 48, "name" : "Jhang Sadar"},
    // { "id" : 49, "name" : "Dera Ismail Khan"},
    // { "id" : 50, "name" : "Nowshera"}

//--add more cities here with care
];
await CitySeq.bulkCreate(citiesData);
}
const createRegions = async () => {
  const regionsData = [
  { id: 1, name: 'Islamabad-region1', cityId: 1 },
  { id: 2, name: 'Islamabad-region2', cityId: 1 },
  { id: 3, name: 'Rawalpindi-region1', cityId: 2 },
  { id: 4, name: 'Rawalpindi-region2', cityId: 2 },
  { id: 5, name: 'Lahore-region1', cityId: 3 },
  { id: 6, name: 'Lahore-region2', cityId: 3 },
  { id: 7, name: 'Karachi-region1', cityId: 4 },
  { id: 8, name: 'Karachi-region2', cityId: 4 },
  { id: 9, name: 'Multan-region1', cityId: 5 },
  { id: 10, name: 'Multan-region2', cityId: 5 },
  // { id: 11, name: 'Hyderabad-region1', cityId: 6 },
  // { id: 12, name: 'Hyderabad-region2', cityId: 6 },
  // { id: 13, name: 'Gujranwala-region1', cityId: 7 },
  // { id: 14, name: 'Gujranwala-region2', cityId: 7 },
  // { id: 15, name: 'Peshawar-region1', cityId: 8 },
  // { id: 16, name: 'Peshawar-region2', cityId: 8 },
  // { id: 17, name: 'Quetta-region1', cityId: 9 },
  // { id: 18, name: 'Quetta-region2', cityId: 9 },
  // { id: 19, name: 'Faisalabad-region1', cityId: 10 },
  // { id: 20, name: 'Faisalabad-region2', cityId: 10 },
  // { id: 21, name: 'Sargodha-region1', cityId: 11 },
  // { id: 22, name: 'Sargodha-region2', cityId: 11 },
  // { id: 23, name: 'Sialkot-region1', cityId: 12 },
  // { id: 24, name: 'Sialkot-region2', cityId: 12 },
  // { id: 25, name: 'Bahawalpur-region1', cityId: 13 },
  // { id: 26, name: 'Bahawalpur-region2', cityId: 13 },
  // { id: 27, name: 'Sukkur-region1', cityId: 14 },
  // { id: 28, name: 'Sukkur-region2', cityId: 14 },
  // { id: 29, name: 'Jhang-region1', cityId: 15 },
  // { id: 30, name: 'Jhang-region2', cityId: 15 },
  // { id: 31, name: 'Sheikhupura-region1', cityId: 16 },
  // { id: 32, name: 'Sheikhupura-region2', cityId: 16 },
  // { id: 33, name: 'Larkana-region1', cityId: 17 },
  // { id: 34, name: 'Larkana-region2', cityId: 17 },
  // { id: 35, name: 'Gujrat-region1', cityId: 18 },
  // { id: 36, name: 'Gujrat-region2', cityId: 18 },
  // { id: 37, name: 'Mardan-region1', cityId: 19 },
  // { id: 38, name: 'Mardan-region2', cityId: 19 },
  // { id: 39, name: 'Dera Ghazi Khan-region1', cityId: 20 },
  // { id: 40, name: 'Dera Ghazi Khan-region2', cityId: 20 },
  // { id: 41, name: 'Sahiwal-region1', cityId: 21 },
  // { id: 42, name: 'Sahiwal-region2', cityId: 21 },
  // { id: 43, name: 'Nawabshah-region1', cityId: 22 },
  // { id: 44, name: 'Nawabshah-region2', cityId: 22 },
  // { id: 45, name: 'Mingora-region1', cityId: 23 },
  // { id: 46, name: 'Mingora-region2', cityId: 23 },
  // { id: 47, name: 'Okara-region1', cityId: 24 },
  // { id: 48, name: 'Okara-region2', cityId: 24 },
  // { id: 49, name: 'Mirpur Khas-region1', cityId: 25 },
  // { id: 50, name: 'Mirpur Khas-region2', cityId: 25 },
  // { id: 51, name: 'Chiniot-region1', cityId: 26 },
  // { id: 52, name: 'Chiniot-region2', cityId: 26 },
  // { id: 53, name: 'Kasur-region1', cityId: 27 },
  // { id: 54, name: 'Kasur-region2', cityId: 27 },
  // { id: 55, name: 'Rahim Yar Khan-region1', cityId: 28 },
  // { id: 56, name: 'Rahim Yar Khan-region2', cityId: 28 },
  // { id: 57, name: 'Jhelum-region1', cityId: 29 },
  // { id: 58, name: 'Jhelum-region2', cityId: 29 },
  // { id: 59, name: 'Kamoke-region1', cityId: 30 },
  // { id: 60, name: 'Kamoke-region2', cityId: 30 },
  // { id: 61, name: 'Hafizabad-region1', cityId: 31 },
  // { id: 62, name: 'Hafizabad-region2', cityId: 31 },
  // { id: 63, name: 'Mandi Bahauddin-region1', cityId: 32 },
  // { id: 64, name: 'Mandi Bahauddin-region2', cityId: 32 },
  // { id: 65, name: 'Khanewal-region1', cityId: 33 },
  // { id: 66, name: 'Khanewal-region2', cityId: 33 },
  // { id: 67, name: 'Sadiqabad-region1', cityId: 34 },
  // { id: 68, name: 'Sadiqabad-region2', cityId: 34 },
  // { id: 69, name: 'Bhakkar-region1', cityId: 35 },
  // { id: 70, name: 'Bhakkar-region2', cityId: 35 },
  // { id: 71, name: 'Jacobabad-region1', cityId: 36 },
  // { id: 72, name: 'Jacobabad-region2', cityId: 36 },
  // { id: 73, name: 'Shikarpur-region1', cityId: 37 },
  // { id: 74, name: 'Shikarpur-region2', cityId: 37 },
  // { id: 75, name: 'Muzaffargarh-region1', cityId: 38 },
  // { id: 76, name: 'Muzaffargarh-region2', cityId: 38 },
  // { id: 77, name: 'Khuzdar-region1', cityId: 39 },
  // { id: 78, name: 'Khuzdar-region2', cityId: 39 },
  // { id: 79, name: 'Chaman-region1', cityId: 40 },
  // { id: 80, name: 'Chaman-region2', cityId: 40 },
  // { id: 81, name: 'Wah Cantonment-region1', cityId: 41 },
  // { id: 82, name: 'Wah Cantonment-region2', cityId: 41 },
  // { id: 83, name: 'Mianwali-region1', cityId: 42 },
  // { id: 84, name: 'Mianwali-region2', cityId: 42 },
  // { id: 85, name: 'Khairpur-region1', cityId: 43 },
  // { id: 86, name: 'Khairpur-region2', cityId: 43 },
  // { id: 87, name: 'Attock-region1', cityId: 44 },
  // { id: 88, name: 'Attock-region2', cityId: 44 },
  // { id: 89, name: 'Mandi-region1', cityId: 45 },
  // { id: 90, name: 'Mandi-region2', cityId: 45 },
  // { id: 91, name: 'Tando Allahyar-region1', cityId: 46 },
  // { id: 92, name: 'Tando Allahyar-region2', cityId: 46 },
  // { id: 93, name: 'Kotri-region1', cityId: 47 },
  // { id: 94, name: 'Kotri-region2', cityId: 47 },
  // { id: 95, name: 'Jhang Sadar-region1', cityId: 48 },
  // { id: 96, name: 'Jhang Sadar-region2', cityId: 48 },
  // { id: 97, name: 'Dera Ismail Khan-region1', cityId: 49 },
  // { id: 98, name: 'Dera Ismail Khan-region2', cityId: 49 },
  // { id: 99, name: 'Nowshera-region1', cityId: 50 },
  // { id: 100, name: 'Nowshera-region2', cityId: 50 }
];

await RegionSeq.bulkCreate(regionsData);
}


async function migration(){
// await UserSeq.destroy({where:{}});
// await CitySeq.destroy({where:{}});
// await RegionSeq.destroy({where:{}});

await BusinessTypeSeq.destroy({where:{}});
// await BusinessSeq.destroy({where:{}});
// ------------------------------------------
// await createUsers();
// await createCities();
// await createRegions();
await createBusinessTypes();
// await createBusiness();
}

migration();