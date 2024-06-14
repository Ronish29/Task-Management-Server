const mongoose = require('mongoose')
require('dotenv').config();

exports.dbConnect =  () =>{
    mongoose.connect(process.env.DATABASE_URL,{

    })
    .then(()=> console.log("Database Connected Succcessfully"))
    .catch((error)=>{
        console.log("DB Connection Failed");
        console.error(error.message);
        process.exit(1);
    })
}