'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var assignUserRoutes = require('./routes/storyRoutes.js');
var assignStoryRoutes = require('./routes/storyRoutes.js');
var assignSegmentRoutes = require('./routes/segmentsRoutes');

//db connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/dev_db');

//middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

//routes
var userRouter = express.Router();
var storyRouter = express.Router();
var segmentRouter = express.Router();

assignUserRoutes(userRouter);
assignStoryRoutes(storyRouter);
assignSegmentRoutes(segmentRouter);

app.use('/user', userRouter);
app.use('/story', storyRouter);
app.use('/segments', segmentRouter);

app.post('/', function(req, res) {
  res.send('hello world');
});

app.listen((process.env.PORT || 3000), function() {
  console.log('server listening on port: ' + (process.env.PORT || 3000));
});
