var mongoose = require('mongoose');
var User = require('../models/User.js');
var Segment = require('../models/Segment.js');
var Story = require('../models/Story.js');
var count;

module.exports = function(router) {
  router.get('/:story', function(req, res) {
    var levels = [];
    Segment.find({storyId: req.params.story}, function(err, segments) {
      if (err) return res.status(500).send('could not find story');

      for (var i = 0; i < segments.length; i++) {
        if (!levels[segments[i].levelId])
          levels[segments[i].levelId] = [];
        levels[segments[i].levelId].push(segments[i]);
      }
      Story.findOne({_id: req.params.story}).populate('firstSegment')
            .exec(function(err, story){
        if (err) return res.status(500).send({'msg':'could not find story'});

        res.json({story:story, levels:levels});
      })
    });
  });

  router.get('/complete/list', function(req, res) {
    Story.find({isComplete: true}).populate('firstSegment').exec(function(err, stories){
      if (err) return console.log(err);

      res.json(stories)
    })
  })
};
