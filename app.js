let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/kuboServer"

const connect = mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })

connect.then((db)=>{
  console.log("Conexion exitosa con la base")
})
.catch((err)=>{
  console.log("Error en la conexion :",err)
})

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter)
app.use('/orders',ordersRouter)


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
