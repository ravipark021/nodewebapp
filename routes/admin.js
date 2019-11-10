const express = require('express');
let multer = require('multer');
const router = express.Router();

let User = require('../models/user');
let Report = require('../models/report');
let ReportDetails = require('../models/report_details');

router.get('/', ensureAdmin, function (req, res) {
    res.render('admin_tasks');
});

router.get('/manage/users', ensureAdmin, function(req, res){
    User.find({_id: {$ne: req.user.id}}, function(err, users){
        res.render('manage_users', {users: users});
    });
});

router.post('/manage/users', function(req, res){
    User.update({_id: req.body.user_id}, {approved: req.body.status}, function(err, result){
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.get('/manage/reports', ensureAdmin, function(req, res){
    res.render('manage_reports');
});

router.get('/manage/reports/add', ensureAdmin, function(req, res){
    res.render('add_report');
});

router.post('/manage/reports/add', function(req, res){
    console.log(req.body);
    let report = new Report();
    report.name = req.body.reportName;
    report.country = req.body.country;
    report.description = req.body.description;
    report.entity_scope = req.body.entity_scope;
    report.event_scope = req.body.event_scope;
    report.product_scope = req.body.product_scope;
    report.regulatory_agency = req.body.regulatory_agency;
    report.regulatory_citation = req.body.regulatory_citation;
    report.report_fields = req.body.report_fields;
    report.report_frequency = req.body.report_frequency;
    report.report_template = req.body.report_template;
    report.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          req.flash('success','Report Added');
          res.redirect('/admin/manage/reports/add');
        }
    });
});

router.get('/report_details/:id', ensureAdmin, function(req, res){
    ReportDetails.find({report_id: req.params.id}, function(err, details){
        if(err){
            console.log(err);
        }
        res.render('report_details', {
            details: details[0].report_details
        });
    });
});

// router.get('/manage/upload_report', function(req, res){
//     res.render('upload_report');
// });
  
// var upload = multer({ dest: 'uploads/' });

// router.post('/manage/upload_report', upload.single('reportFile'), function(req, res){
//     upload(req,res,function(err){
//         if(err){
//              res.json({error_code:1,err_desc:err});
//              return;
//         }
//         res.json({error_code:0,err_desc:null});
//     });
// });

// Access Control
function ensureAdmin(req, res, next){
    if(req.isAuthenticated() && res.locals.isAdmin){
      return next();
    } else {
      req.flash('danger', 'Please login as admin!');
      res.redirect('/users/login');
    }
  }

module.exports = router;