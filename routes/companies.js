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

module.exports = router;
