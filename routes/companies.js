const express = require("express");
const router = express.Router();
const config = require("../data/database");
const company = require("../models/company");
const test = require("../models/test");
const ObjectId = require('mongoose').ObjectId;
const mongoose = require('mongoose');
const OId = require('mongodb').ObjectID;

//get all from database
router.get('/dashboard', function(req, res, next) {

    company.find({})
        .exec(function(err, companies) {
            if (err) {
                console.log('Error retrieving data');
            } else {
                res.json(companies);
            }
        });
});

//get a specific employee by id
router.get('/dashboard/:id', (req, res) => {
    company.findById(req.params.id)
          .exec(function(err, emp) {
              if (err) {
                  console.log('cannot find ' + req.params.id);
                  next(err);
              } else {
                  res.json(emp);
              }
          });
});

/*get a specific employee by name
router.get('/dashboard/:id', (req, res) => {
    company.findById(req.params.id)
          .exec(function(err, emp) {
              if (err) {
                  console.log('cannot find ' + req.params.id);
                  next(err);
              } else {
                  res.json(emp);
              }
          });
});*/

//add an employee
router.post('/dashboard/create', function(req, res) {
    let newEmp = new company({
      _id: new mongoose.mongo.ObjectId(),
      name: req.body.name,
      employee: req.body.employee
    });

    company.addEmp(newEmp, function(err, newEmp) {
        if(err) {
            res.json({success: false, msg: "fail to add employee"});
        } else {
            res.json({success: true, msg: "added employee"});
        }
    });
});

//update an employee
router.post('/dashboard/update/:id', function(req, res) {
    company.findById(req.params.id)
        .exec(function(err, emp) {
            if (err) {
                res.json({success: false, msg: "fail to find employee"});
            } else {
                emp.name = req.body.name;
                emp.employee = req.body.employee;
                emp.save();
                res.json({success: true, msg: "updated"});
            }
        });
});

//delete a specific one //try /delete/:id
router.get('/dashboard/delete/:id', (req, res) => {
    company.findByIdAndRemove(req.params.id)
          .exec(function(err, emp) {
              if (err) {
                  console.log('cannot delete ' + req.params.id);
                  next(err);
              } else {
                  res.json(emp);
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
