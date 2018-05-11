const express = require("express");
const router = express.Router();
const config = require("../data/database");
const company = require("../models/company");
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

//get a specific one
router.get('/dashboard/:id', (req, res) => {
    //'_id': req.params.id}
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

//add an employee
router.post('/dashboard/create', function(req, res) {
    let newEmp = new company({
      _id: new mongoose.mongo.ObjectId(),
      name: req.body.name,
      employee: req.body.employee
    });

    company.addEmp(newEmp, function(err, newEmp) {
        if(err) {
            console.log('Error inserting the employee ' + err);
            res.json({success: false, msg: "fail to add employee"});
        } else {
            res.json({success: true, msg: "added employee"});
        }
    });
});

//update an employee TODOODODODO
router.post('/dashboard/update/:id', function(req, res) {
    console.log('Updating an employee');

    company.findById(req.params.id)
        .exec(function(err, emp) {
            if (err) {
                console.log('Could not find the employee');
            } else {
                console.log('sending update');
                emp.name = req.body.name;
                emp.employee = req.body.employee;
                article.save();
                res.json(emp);
            }
        });
});

//delete a specific one //try /delete/:id
router.get('/dashboard/delete/:id', (req, res) => {
    console.log('Deleting Employee');
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

module.exports = router;
