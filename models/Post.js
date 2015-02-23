'use strict';

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  storyID: String,
  author: String,
  segmentNumber: String,
  postBody: String
});

module.exports = mongoose.model('Post', postSchema);