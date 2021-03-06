const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const config = require("../data/database");
const User = require("../models/user");

//Register
router.post("/register", function(req, res, next){
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, function(err, user){
    if (err){
      res.json({success: false, msg: "fail register"});
    }
    else{
      res.json({success: true, msg: "successful"});
    }
  });

});

//Auth
router.post("/authenticate", function(req, res, next){
  //get username and pw
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return res.json({success:false, msg: "User not found"});
    }
    //compare user password with the hash password (from user)
    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        //create token
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 600 //ten minutes
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      }else{
        return res.json({success:false, msg: "Wrong Password"});
      }

    });
  });
});

//profile (protected)
router.get("/profile", passport.authenticate('jwt', {session:false}), function(req, res, next){
   res.json({user: req.user});
});

module.exports = router;
