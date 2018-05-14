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

    test.addNewTest(req.body.testname,req.body.result, req.body._id, function(err, newTest) {
        if(err) {
            res.json({success: false, msg: "fail to add test"});
        } else {
            res.json({success: true, msg: "added test"});
        }
    });
});

//delete a test from an employee
router.get('/dashboard/delete/:id', (req, res) => {
    test.removeTest(req.body._id, req.params.id, function(err, newTest) {
        if(err) {
            res.json({success: false, msg: "fail to remove test"});
        } else {
            res.json({success: true, msg: "removed test"});
        }
    });
});

module.exports = router;
