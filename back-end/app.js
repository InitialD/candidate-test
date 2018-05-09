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

//set static folders, had double front-end folder when built, moved up one
app.use(express.static( path.join( path.resolve("."), "front-end/dist")));

//BodyParser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//pass in the passport
require('../data/passport')(passport);

//Routes
app.use("/users", users);

//Index Route
app.get('/dist', function(req, res){
  res.send("Invalid");
});

 //redirect every other route
app.get('*', function(req,res){
  res.sendFile(path.join( path.resolve("."), "front-end/dist/index.html"))
});

//Start Server
app.listen(port, function(){
  console.log("server started on port " +port);
});
