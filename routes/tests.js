const express = require("express");
const router = express.Router();
const config = require("../data/database");
const company = require("../models/company");
const test = require("../models/test");
const ObjectId = require('mongoose').ObjectId;
const mongoose = require('mongoose');
const OId = require('mongodb').ObjectID;

//get a specific employee by id with tests? does this work?
router.get('/dashboard/:id', (req, res) => {
    console.log('In tests finding tests' + req.params.id);
    test.findById(req.params.id)
          .exec(function(err, emptest) {
              if (err) {
                  console.log('cannot find tests' + req.params.id);
                  next(err);
              } else {
                  res.json(emptest);
              }
          });
});

//add a test to an employee
router.post('/dashboard/:id/addtest', function(req, res) {
    let newTest = new test({
      _id: new mongoose.mongo.ObjectId(),
      testname: req.body.testname,
      result: req.body.result
    });

    test.addNewTest(newTest, function(err, newTest) {
        if(err) {
            res.json({success: false, msg: "fail to add test"});
        } else {
            res.json({success: true, msg: "added test"});
        }
    });
});

module.exports = router;
