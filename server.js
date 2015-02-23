'use strict'

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

//db connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/dev_db');

//middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', function(req, res){
  res.send('hello world')
})


app.listen((process.env.PORT || 3000), function(){
  console.log('server listening on port: ' + (process.env.PORT || 3000))
});