const dotenv = require("dotenv");
const mongoose = require("mongoose");
const DB = process.env.DATABASE;

console.log("DB: "+JSON.stringify(DB))

//DB connection using mongoose
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connection success !!....")
}).catch(console.error());
