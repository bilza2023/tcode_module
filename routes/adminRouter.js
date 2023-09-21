const express = require('express');
const { City} = require('../dbSqlite/dbSqlite');
const adminRouter = express.Router();


//----
adminRouter.get('/', (req, res) => {
return res.status(200).render('admin');
});
//----


////////////////////////////////////////////////////////
module.exports = adminRouter;


