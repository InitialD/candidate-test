const mongoose = require("mongoose");
const config = require("../data/database");
const OId = require('mongodb');



const TestSchema = mongoose.Schema({
  _id:String,
  tests:[{date:String, testname:String, result:String}]
});

const Test = module.exports = mongoose.model("Test", TestSchema);

module.exports.getTests = function(callback){
  Test.find({}, callback);
}

module.exports.addNewTest = function(testName, testResult ,empId, callback){
    // TODO: check for existing name as the object insertion a tuple
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes();

    let objId = new mongoose.mongo.ObjectId(empId);
      Test.update({ "_id": objId  },
        { $addToSet: { "tests": {"date":datetime,"testname":testName,"result":testResult} }},
        {upsert: true}, callback);
}

module.exports.removeTest = function(testId,empId, callback){
      Test.update({ "_id": empId  },
        { $pull: { "tests": {"_id":testId} }},
         callback);
}

module.exports.updateCurrTest = function(testName, testResult ,empId, testId, callback){
      Test.updateOne({ "_id": empId, "tests._id": testId},
        { $set: {"tests.$.testname":testName,"tests.$.result":testResult} },
        callback);
}
