'use strict';

var mongoose = require('mongoose');

var segmentSchema = new mongoose.Schema({
  storyID: String,
  author: mongoose.Schema.Types.ObjectId,
  levelID: Number,
  postBody: String,
  createdAt: Date,
  favorited: Number
});

module.exports = mongoose.model('Segment', segmentSchema);