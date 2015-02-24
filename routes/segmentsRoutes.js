'use strict';

var Segment = require('../models/Segment');
var bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());

  app.post('/newSegment', function(req, res) {
    var newSegment = new Segment(req.body);
    newSegment.save(function(err, segment) {
      if (err) return res.status(500).send({'msg': 'could not save segment'});

      res.json(segment);
    });
  });
};