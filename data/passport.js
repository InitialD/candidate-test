const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require("../data/database");

module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload,done){
    User.getUserById(jwt_payload.data._id, function(err, user){
      if(err){
        return done(err,false);
      }
      if (user){ //pass if found
        return done(null, user);
      }
      else{
        return done(null, false);
      }
    });
  }));
}