const mongoose = require('mongoose');
require('dotenv').config();
// process.on('uncaughtException', function (err) {
//     console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
//     console.error(err.stack);
//     process.exit(1);
// });
//.......................................................
mongoose.connect( process.env.MONGO_URI);
// mongoose.connect( process.env.MONGO_DB_LOCAL_URL , { useNewUrlParser: true});

const db = mongoose.connection;
db.on('error',(error)=> {throw new Error(error)} );

module.exports = db;

