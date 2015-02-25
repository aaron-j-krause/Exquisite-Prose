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
      if (err) return res.status(500).send({msg:'could not save'});
      res.send('user created');
    });
  });

  app.get('/:screenname', function(req, res) {
    var posts = [];
    var postCount;
    var useres = {};
    Segment.find({author: req.params.screenname}, function(err, segments) {
      if (err) return res.status(500).send({msg: 'could not find segments'});
      postCount = segments.length < 25 ? segments.length : 25;
      for (var i = 0; i < postCount; i++) {
        posts.push(segments[i]);
      }
      User.findOne({screenname: req.params.screenname}, function(err, user) {
        if (err) return res.status(500).send({msg:'could not find user'});
        useres.screenname = user.screenname;
        useres.posts = posts;
        useres.location = user.location;
        useres.createdAt = user.createdAt;

        res.json(useres);
      });
    });
  });
};
