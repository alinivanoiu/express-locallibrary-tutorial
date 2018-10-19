var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet');
var mongoose = require('mongoose');
var mongoDBURL = "mongodb://alin.ivanoiu:killswitch99x@ds052978.mlab.com:52978/aiv-library";
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wikiRouter = require('./routes/wiki');
var catalogRouter = require('./routes/catalog');


var app = express();
// Connect to the mongodb
mongoose.connect(mongoDBURL);
// Change the Promise of mongoose to the global Promise
mongoose.Promise = global.Promise;
// Store the connection in a variable
var db = mongoose.connection;
// Handle the potential error
db.on('error', console.error.bind(console, 'MongoDB error:'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wiki', wikiRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;