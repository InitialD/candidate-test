const mongoose = require("mongoose");
const config = require("../data/database");
const OId = require('mongodb');

const TestSchema = mongoose.Schema({
  _id:String,
  tests:[{testname:String, result:String}]
});

const Test = module.exports = mongoose.model("Test", TestSchema);

module.exports.getTests = function(callback){
  Test.find({}, callback);
}

module.exports.addNewTest = function(testName, testResult ,empId, callback){
    // TODO: check for existing name as the object insertion a tuple
    let objId = new mongoose.mongo.ObjectId(empId);
      Test.update({ "_id": objId  },
        { $addToSet: { "tests": {"testname":testName,"result":testResult} }},
        {upsert: true}, callback);
}

module.exports.removeTest = function(testId,empId, callback){
      Test.update({ "_id": empId  },
        { $pull: { "tests": {"_id":testId} }},
         callback);
}
