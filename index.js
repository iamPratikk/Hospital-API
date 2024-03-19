const express = require('express');
const app = express();
const port = 3000;
const passport = require("passport");
//must import the jwt strategy from the config folder
const passportJwt = require("./config/passport");

//This is for our Db connection
const db = require("./config/mongoose");

//This is user because we want to read the request data which is in form of JSON
app.use(express.json());

//Gives control to our router
app.use("/", require('./routes'));

app.listen(port,(err)=>{
    if(err){
       return  console.log("There has been some error", err)
    }
    console.log("Serve is running at ", port)
})