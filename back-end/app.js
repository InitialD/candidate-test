const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("../data/database.js");

//connect to db
mongoose.connect(config.database);

//on connection
mongoose.connection.on("connected", function(){
  console.log("connected to db " +config.database);
});

//if error trying to connect to db
mongoose.connection.on("error", function(err){
  console.log("db error: " +err);
});

const app = express();

const users = require("../routes/users");

const port = 3000;

app.use(cors());

//set static folders
app.use(express.static( path.join( path.resolve("."), "front-end")));

//Body Parser middleware
app.use(bodyParser.json());

app.use("/users", users);

//Index Route
app.get('/', function(req, res){
  res.send("Invalid");
});

//Start Server
app.listen(port, function(){
  console.log("server started on port " +port);
});
