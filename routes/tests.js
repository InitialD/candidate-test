const express = require("express");
const router = express.Router();
const config = require("../data/database");
const company = require("../models/company");
const test = require("../models/test");
const ObjectId = require('mongoose').ObjectId;
const mongoose = require('mongoose');
const OId = require('mongodb').ObjectID;

//get a specific employee by id with tests
router.get('/dashboard/:id', (req, res) => {
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

//get a specific test from specific employee
router.get('/dashboard/:id/:tid', (req, res) => {
  test.find( {"_id": req.params.id},{ "tests" : { $elemMatch : { "_id": req.params.tid}}} )
    .exec(function(err, currTest) {
        if (err) {
          console.log('cannot find test' + req.params.tid + 'for ' +req.params.id);
          next(err);
        } else {
          res.json(currTest);
        }
    });
});

//add a test to an employee
router.post('/dashboard/:id/addtest', function(req, res) {

    test.addNewTest(req.body.testname,req.body.result, req.body._id, function(err, newTest) {
        if(err) {
            res.json({success: false, msg: "fail to add test"});
        } else {
            res.json({success: true, msg: "added test"});
        }
    });
});

//delete a test from an employee
router.get('/dashboard/delete/:id/:tid', (req, res) => {
    test.removeTest(req.params.tid, req.params.id, function(err, newTest) {
        if(err) {
            res.json({success: false, msg: "fail to remove test"});
        } else {
            res.json({success: true, msg: "removed test"});
        }
    });
});

//update a given test for a given employee
router.post('/dashboard/update/:id/:tid', function(req, res) {

    test.updateCurrTest(req.body.testname,req.body.result, req.params.id, req.params.tid, function(err, newTest) {
        if(err) {
            res.json({success: false, msg: "fail to add test"});
        } else {
            res.json({success: true, msg: "added test"});
        }
    });
});

module.exports = router;
