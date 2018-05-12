const mongoose = require("mongoose");
const config = require("../data/database");

const TestSchema = mongoose.Schema({
  _id:String,
  tests:[{testname:String, result:String}]
});

const Test = module.exports = mongoose.model("Test", TestSchema);

module.exports.getTests = function(callback){
  Test.find({}, callback);
}

module.exports.addNewTest = function(newTest, callback){
      newTest.save(callback);
}
