'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var storySchema = new Schema({
  author: String,
  createdAt: String,
  name: String,
  length: {type: Number, default: 1},
  isComplete: {type: Boolean, default: false},
  levelSpec: {
    fill: {type: Number, default: 0},
    currentLevel: {type:Number, default: 1}
  },
  firstSegment: {type: Schema.Types.ObjectId, ref:'Segment'}
});

module.exports = mongoose.model('Story', storySchema);
