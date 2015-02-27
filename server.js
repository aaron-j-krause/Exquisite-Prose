'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var assignUserRoutes = require('./routes/userRoutes.js');
var assignStoryRoutes = require('./routes/storyRoutes.js');
var assignSegmentRoutes = require('./routes/segmentsRoutes');
var passport = require('passport');
var assignBasicPassportStrat = require('./lib/passport_strat');

//db connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/dev_db');

//auth
app.set('appSecret', process.env.SECRET || 'chaaaaaaange');
app.use(passport.initialize());
assignBasicPassportStrat(passport);

//middleware
app.use(bodyParser.json());

//routes
var userRouter = express.Router();
var storyRouter = express.Router();
var segmentRouter = express.Router();

assignUserRoutes(userRouter, passport, app.get('appSecret'));
assignStoryRoutes(storyRouter);
assignSegmentRoutes(segmentRouter, app.get('appSecret'));

app.use('/user', userRouter);
app.use('/story', storyRouter);
app.use('/segments', segmentRouter);

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen((process.env.PORT || 3000), function() {
  console.log('server listening on port: ' + (process.env.PORT || 3000));
});
