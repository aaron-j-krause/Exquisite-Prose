var mongoose = require('mongoose');
var User = require('../models/User.js');
var Segment = require('../models/Segment.js');

module.exports = function(router){
  router.get('/:story', function(req, res){
    var story = {
      storyId: req.params.story,
      levels: []
    };
    var number = Number(req.params.story)
    story.levels = [];
    Segment.find({}, function(err, segments){
      console.log(segments);
    })
    Segment.find({storyId: number}, function(err, segments){
      console.log('BINK');
      console.log(typeof req.params.story)
      console.log(segments);
      if (err) return res.status(500).send('could not find story');
      for(var i = 0; i < segments.length; i++){
        console.log('BONK')
          console.log('LEVEL ID', segments[i].text);
          story.levels[segments[i].levelId] = segments[i];
        }
      res.json(story);
    })
  })
}