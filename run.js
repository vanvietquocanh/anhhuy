var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const Validator = require('express-validator');
const Session = require('express-session');


var index = require('./routes/index');
// var admin = require('./routes/admin');
var submit = require('./routes/submit');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Validator());
app.use(function (req, res, next) {
          console.log(req.secure);
        if (req.secure) {
                next();
        } else {
                res.redirect('https://' + req.headers.host + req.url);
        }
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(Session({secret:'123123321', saveUninitialized: false, resave:false}));
app.use('/', index);
// app.use('/', admin);
app.use('/', submit);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found!!');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
