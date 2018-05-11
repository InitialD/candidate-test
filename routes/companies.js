const express = require("express");
const router = express.Router();
const config = require("../data/database");
const company = require("../models/company");
const ObjectId = require('mongoose').ObjectId;
const OId = require('mongodb').ObjectID;

//get all from database
router.get('/dashboard', function(req, res, next) {

    company.find({})
        .exec(function(err, companies) {
            if (err) {
                console.log('Error retrieving data');
            } else {
                console.log('Getting All');
                console.log(typeof companies);
                res.json(companies);
            }
        });
});

//get a specific one
router.get('/dashboard/:id', (req, res) => {
    console.log('Requesting a specific employee' + req.params.id);
    //'_id': req.params.id}
    company.findById(req.params.id)
          .exec(function(err, emp) {
              if (err) {
                  console.log('cannot find ' + req.params.id);
                  next(err);
              } else {
                  console.log('emplo ' + typeof emp);
                  res.json(emp);
              }
          });
});

module.exports = router;
