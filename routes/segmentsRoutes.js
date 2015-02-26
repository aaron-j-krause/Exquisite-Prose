'use strict';

var Segment = require('../models/Segment');
var Story = require('../models/Story');

var MAX_SEGMENTS = 10;
var MAX_LEVEL_SIZE = 3;
module.exports = function(app) {

  app.post('/new_segment', function(req, res) {
    var newSegment = new Segment(req.body);
    newSegment.createdAt = new Date().toString();
    newSegment.save(function(err, segment) {
      if (err) return res.status(500).send({'msg': 'could not save segment'});
      if (segment.levelId === 0) {
        var newStory = new Story({
          firstSegment: segment._id,
          createdAt: segment.createdAt,
          name: segment.storyName,
          author: segment.author
        });
        newStory.save(function(err, story) {
          if (err) return res.status(500).send(err);
          segment.update({storyId: story._id}, function(err, thing){
            if (err) return res.status(500).send(err);
            res.json(story);
          })
        });
      } else {
        Story.findOne({_id: segment.storyId}, function(err, story) {
          if (err) return res.status(500).send(err);
          story.length++;
          story.levelSpec.fill++;
          if (story.length >= MAX_SEGMENTS) story.isComplete = true;
          if (story.levelSpec.fill >= MAX_LEVEL_SIZE) {
            story.levelSpec.fill = 0;
            story.levelSpec.currentLevel++;
          };
          story.save(function(err, story) {
            res.json(story); 
          })
            
        })
      }
    })

  });

  app.get('/seed/:storyId', function(req, res) {
    Story.findOne({_id: req.params.storyId}).populate('firstSegment').exec(function(err, story){
      if (err) res.status(500).send(err);
      var lastLevel = story.levelSpec.currentLevel - 1;
      if (lastLevel <= 0) {
        res.json({text: story.firstSegment.postBody, storyId: story._id});
      } else {
      Segment.find({storyId: story._id, levelId: lastLevel}, function(err, segments){
        if(err) res.status(500).send(err);
        var randomIndex = Math.floor(Math.random() * segments.length);
        var text = segments[randomIndex].postBody;
        res.json({text: text, storyId: story._id});
      })
      }
    })
  })

  app.get('/random', function(req, res) {
    Story.find({isComplete: false}).populate('firstSegment').exec(function(err, stories) {
      if (err) res.status(500).send(err);
      var text;
      var id;
      var query = {$or:[]}
      for(var i in stories){
        var level = (stories[i].levelSpec.currentLevel - 1);
        query.$or.push({storyId: stories[i]._id, levelId:level})
      }
      Segment.find(query, function(err, segments){
        if (err) res.status(500).send(err);

        res.send(segments);
      })


    })
  })

  app.get('/dev/allSegments', function(req, res) {
    Segment.find({}, function(err, segments){
      if (err) res.status(500).send(err);
      res.send(segments);
    })
  })
};
