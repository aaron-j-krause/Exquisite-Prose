'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var segmentSchema = new Schema({
  storyId: String,
  author: String,
  levelId: Number,
  postBody: String,
  createdAt: String,
  storyName: String,
});

module.exports = mongoose.model('Segment', segmentSchema);
