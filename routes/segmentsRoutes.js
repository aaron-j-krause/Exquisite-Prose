'use strict';

var Segment = require('../models/Segment');
var Story = require('../models/Story');

module.exports = function(app) {

  app.post('/new_segment', function(req, res) {
    var newSegment = new Segment(req.body);
    newSegment.createdAt = new Date().toString();
    newSegment.save(function(err, segment) {
      if (err) return res.status(500).send({'msg': 'could not save segment'});
      if (segment.levelId === 0) {
        var newStory = new Story();
        newStory.firstSegment = segment._id;
        newStory.createdAt = segment.createdAt;
        newStory.name = segment.storyName;
        newStory.author = segment.author;
        newStory.save(function(err, story){
          if (err) console.log(err);
          res.json(story);
        })
      } else {


      res.json(segment);
        
      }

    });
  });
};
