var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('./authenticate');

var config = require('./config');

//mongoose.connect(config.uri); 

mongoose.connect(config.MONGODB_URI);

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    //we're connected!
    console.log("You are now connected to the server!");
});

var routes = require('./routes/index');
var users = require('./routes/users');
var itemRouter = require('./routes/itemRouter');
var favoriteRouter = require('./routes/favoriteRouter');

var app = express();

////////////////////Secure traffic only, redirect to secure server. 
//Apply to all incoming traffic.
app.all('*', function(req, res, next){
  if (req.secure) { //set to true.
    return next();
  };
//If localhost is not secure, this will redirect to secure port(3443)
 res.redirect('https://'+req.hostname+':'+app.get('secPort')+req.url);
});
///////////////////////////////////////////////////////

//TELLS THE APP WHERE TO FIND IT'S VIEWS and WHAT ENGINE TO USE TO RENDER THE VIEWS, 
//AND CALLS THE METHODS TO GET THINGS UP AND RUNNING.
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// passport config, to track users and store users in the database. 
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

//Make our db accessible to our router.
//This code must be placed above the app.use('/',routes)..
app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/items',itemRouter);
app.use('/favorites', favoriteRouter);

/////////////ERROR HANDLERS///////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
