const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database, { dbName: 'test_db', useNewUrlParser: true });
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  res.locals.isAdmin = (req.user && req.user.role == "Admin") || null;
  next();
});

// app.get('/admin/*', function(req, res, next){
//   if(req.user.role == "Admin"){
//     res.render('admin');
//   }
//   else{
//     req.flash('danger', 'You need to login as Admin first');
//     res.redirect('/User/login');
//   }
// });

// Home Route
app.get('/', function(req, res){
  if(req.user != null){
    res.redirect('/reports/search');
  }
  else{
    req.flash('danger', 'You need to login/register first');
    res.redirect('/users/login');
  }
});

// Route Files
let users = require('./routes/users');
let reports = require('./routes/reports');
let admin = require('./routes/admin');
app.use('/users', users);
app.use('/reports', reports);
app.use('/admin', admin);


// Start Server
app.listen(3000, function(){
  console.log('Server started on port 3000...');
});
