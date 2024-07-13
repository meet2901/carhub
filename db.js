const mongoose = require("mongoose");

require('dotenv').config()
//mongodb database URL 
const mongoURL=process.env.MONGODB_URL
// const mongoURL=' mongodb+srv://meet85734:3meet2005@hotels.fhyrv4g.mongodb.net/<dbname>?retryWrites=true&w=majority&ssl=true';

// const mongoURL = 'mongodb://localhost:27017/hotels'//server link and at last collection table name like ="hotels"
//giving conection of databases on URL
mongoose.connect(mongoURL, {
    useNEWUrlparser: true,
})


//crerate a object for database connectivity
const db = mongoose.connection;

//checking connection pf databases where database are connected,disconnected or  error
db.on("connected", () => {
    console.log("data base conected sucessfuly");
})


db.on("error", (err) => {
    console.error("something error in database conection", err);
})


db.on("disconnected", () => {
    console.log("data base disconnected ");
})

//export database file to the main server file 
module.exports = db; 