var mongoose = require('mongoose');
var User = require('../models/User.js');
var Segment = require('../models/Segment.js');
var Story = require('../models/Story.js');
var count;

function assembleLevels (segments) {
  var levelArray = [];
  for (var i = 0; i < segments.length; i++) {
    if (!levelArray[segments[i].levelId]) levelArray[segments[i].levelId] = [];
    levelArray[segments[i].levelId].push(segments[i]);
  }
  return levelArray;
}

module.exports = function(router) {
  router.get('/:story', function(req, res) {
    Segment.find({storyId: req.params.story}, function(err, segments) {
      if (err) return res.status(500).send('could not find story');

      var levels = assembleLevels(segments);

      Story.findOne({_id: req.params.story}).populate('firstSegment')
            .exec(function(err, story) {
        if (err || story === null)
          return res.status(500).send({'msg':'could not find story'});

        res.json({story:story, levels:levels});
      });
    });
  });

  router.get('/complete/list', function(req, res) {
    Story.find({isComplete: true}).populate('firstSegment')
      .exec(function(err, stories) {

        if (err) return res.status(500).send('could not find');
        if (stories.length === 0)
          return res.status(400).send('No completed stories');

        res.json(stories);
      });
  });

  router.get('/incomplete/random', function(req, res) {
    Story.find({isComplete: false}).select('_id').exec(function(err, ids) {
      if (err) return res.status(500).send('could not find');
      var randomId = ids[Math.floor(Math.random() * ids.length)];

      Story.findOne({_id: randomId}, function(err, story) {
        if (err || story === null)
          return res.status(500).send('could not get story');
        Segment.find({storyId: story._id}, function(err, segments) {
          if (err) return res.status(500).send('could not find');

          var levels = assembleLevels(segments);
          res.send({story: story, levels: levels});
        });
      });
    });
  });


  router.get('/dev/allComplete', function(req, res) {
    Story.find({isComplete: true}, function(err, stories) {
      if (err) return res.status(500).send('could not find');
      res.send(stories);
    });
  });

  router.get('/dev/allIncomplete', function(req, res) {
    Story.find({isComplete: false}, function(err, stories) {
      if (err) return res.status(500).send('could not find');
      res.send(stories);
    });
  });
};
