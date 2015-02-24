var mongoose = require('mongoose');
var User = require('../models/User.js');
var Segment = require('../models/Segment.js');

module.exports = function(router){
  router.get('/:story', function(req, res){
    var story = {
      storyId: req.params.story,
      levels: []
    };
    story.levels = [];
    Segment.find({storyId: req.params.story}, function(err, segments){
      if (err) return res.status(500).send('could not find story');
      for(var i = 0; i < segments.length; i++){
          story.levels[segments[i].levelId] && story.levels[segments[i].levelId] = segment;
        }
      res.json(story);
      }
    })
  })
}