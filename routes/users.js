const express = require("express");
const router = express.Router();

//Register
router.get("/register", function(req, res, next){
  res.send("REGISTER");
});

//Auth
router.get("/authenticate", function(req, res, next){
  res.send("authenticate");
});

//profile (protected)
router.get("/profile", function(req, res, next){
  res.send("profile");
});

//Validate
router.get("/validate", function(req, res, next){
  res.send("validate");
});

module.exports = router;
