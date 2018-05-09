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
                res.json(companies);
            }
        });
});

module.exports = router;
