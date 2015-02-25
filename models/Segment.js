'use strict';

var mongoose = require('mongoose');

var segmentSchema = new mongoose.Schema({
  storyId: Number,
  author: String,
  levelId: Number,
  postBody: String,
  createdAt: String,
  favorited: Number
});

module.exports = mongoose.model('Segment', segmentSchema);
