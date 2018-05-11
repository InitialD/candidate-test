const mongoose = require("mongoose");
const config = require("../data/database");

//company schema
const CompanySchema = mongoose.Schema({
  _id:String,
  name:String,
  employee:String
});

const Company = module.exports = mongoose.model("Company", CompanySchema);

module.exports.getCompany = function(callback){
  User.find({}, callback);
}

module.exports.addEmp = function(newEmp, callback){
      newEmp.save(callback);
}
