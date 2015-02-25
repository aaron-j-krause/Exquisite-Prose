'use strict';

var Segment = require('../models/Segment');

module.exports = function(app) {

  app.post('/new_segment', function(req, res) {
    var newSegment = new Segment(req.body);
    newSegment.createdAt = new Date().toString();
    newSegment.save(function(err, segment) {
      if (err) return res.status(500).send({'msg': 'could not save segment'});

      res.json(segment);
    });
  });
};
