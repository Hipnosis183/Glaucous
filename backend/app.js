var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var indexRouter = require('./routes/index');

// Define MongoDB and Mongoose.
var mongoose = require('mongoose');
var mongoDB = process.env.MONGO_LOCAL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

let server = app.listen(3000, function () {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
