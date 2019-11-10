const express = require('express');
const router = express.Router();

//Reports model
let Report = require('../models/report');

router.get('/search', ensureAuthenticated, function (req, res) {
    res.render('search_report');
});

router.get('/findreport', function (req, res) {
    let name = req.query.reportName;
    let citation = req.query.citation;
    if(name.length > 0 || citation.length > 0){
        Report.find({
            "name": {
                "$regex": name,
                "$options": "i"
            },
            "regulatory_citation": {
                "$regex": citation,
                "$options": "i"
            }
        }, function(err, reports){
            if(err){
                console.log(err);
            }
            return res.send(reports);
        });
    }
    else{
        Report.find({}, function(err, reports){
            if(err){
                console.log(err);
            }
            return res.send(reports);
        });
    }
});

router.get('/:id', ensureAuthenticated, function(req, res){
    let id = req.params.id;
    Report.findById(id, function(err, report){
        if(err){
            console.log(err);
        }
        res.render('report', {report: report});
    });
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/users/login');
    }
  }

module.exports = router;