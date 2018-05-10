const express = require("express");
const router = express.Router();
const config = require("../data/database");
const company = require("../models/company");

//get all from database
router.get('/dashboard', function(req, res, next) {

    company.find({})
        .exec(function(err, companies) {
            if (err) {
                console.log('Error retrieving data');
            } else {
                console.log('Getting All');
                res.json(companies);
            }
        });
});

//get a specific one
router.get('/dashboard/companies/:id', function(req, res, next) {
    console.log('Requesting a specific employee1');
    company.findOne({_id: req.params.id})
        .exec(function(err, company) {
            if (err) {
                console.log('cannot find');
                next(err);
            } else {
                console.log('One '+ company);
                res.json(company);
            }
        });
});

module.exports = router;
