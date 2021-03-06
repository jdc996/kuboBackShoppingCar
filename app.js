let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let errorHandler= require('./error-handler/error-handler')


const mongoose = require('./db');



//let indexRouter = require('./routes/index');
//let usersRouter = require('./routes/users');
let productsRouter = require('./module/product/route/product');
let ordersRouter = require('./module/order/route/orders')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/products',productsRouter)
app.use('/orders',ordersRouter)



app.use(async (err, req, res, next) => {
  const type = await errorHandler.handleError(err);
  return res.status(type.statusCode).send(type);
});

module.exports = app;
