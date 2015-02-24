'use strict';

var Segment = require('../models/Segment');

module.exports = function(app) {

  app.post('/newSegment', function(req, res) {
    var newSegment = new Segment(req.body);
    newSegment.createdAt = new Date();
    newSegment.save(function(err, segment) {
      if (err) return res.status(500).send({'msg': 'could not save segment'});

      res.json(segment);
    });
  });
};
