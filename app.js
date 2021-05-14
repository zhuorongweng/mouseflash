var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var layouts = require('express-ejs-layouts');

const mariadb = require('mariadb/callback');
const db = mariadb.createConnection({host: 'eagle.cdm.depaul.edu',
           user: 'zweng1', password: 'zweng1', 
           database: 'mouseflash'});
           
// connect to database
db.connect((err) => {
  if (err) {
    console.log("Unable to connect to database due to error: " + err);  res.render('error');
  } else
  {
    console.log("Connected to DB");
  }
  });
  global.db = db;
  

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var helpRouter = require('./routes/help');
var privacyRouter = require('./routes/privacy');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');
var customerRouter = require('./routes/customer');
var supplierRouter = require('./routes/supplier');
var saleorderRouter=require('./routes/saleorder');
var orderdetailRouter=require('./routes/orderdetail');
var reviewRouter=require('./routes/review');
var subscriptionRouter=require('./routes/subscription');
var searchRouter = require('./routes/search');
var reportRouter = require('./routes/report');
var promotionRouter = require('./routes/promotion');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

app.use('/help', helpRouter);
app.use('/privacy', privacyRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/customer', customerRouter);
app.use('/supplier', supplierRouter);
app.use('/saleorder', saleorderRouter);
app.use('/orderdetail', orderdetailRouter);
app.use('/review', reviewRouter);
app.use('/subscription', subscriptionRouter);
app.use('/search', searchRouter);
app.use('/report', reportRouter);
app.use('/promotion', promotionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
