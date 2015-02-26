'use strict';

var User = require('../models/User');
var Segment = require('../models/Segment');

module.exports = function(app) {
  app.post('/create_user', function(req, res) {
    var newUser = new User();
    newUser.createdAt = new Date().toString();
    newUser.basic.email = req.body.email;
    newUser.basic.password = req.body.password;
    newUser.screenname = req.body.screenname;
    newUser.location = req.body.location;

    newUser.save(function(err, user) {
      if(err) return res.status(500).send({msg:'could not save'});

      res.json(user);
    });
  });

  app.get('/:screenname', function(req, res) {
    User.findOne({screenname: req.params.screenname}, function(err, user) {
      if (err || user === null) return res.status(500).send({msg:'could not find user'});

      Segment.find({author: req.params.screenname}, function(err, segments) {
        var userres = {};
        userres.screenname = user.screenname;
        userres.location = user.location;
        userres.createdAt = user.createdAt;
        var segments = segments.length > 25 ? segments.slice(25) : segments
        res.json({user:userres, segments:segments});
      });
    });
  });
};
