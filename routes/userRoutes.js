'use strict';

var User = require('../models/User');
var Segment = require('../models/Segment')

module.exports = function(app) {
  app.post('/create_user', function(req, res) {
    var newUser = new User();
    newUser.createdAt = new Date();
    newUser.basic.email = req.body.email;
    newUser.basic.password = req.body.password;
    newUser.
  });

  app.get('/:name', function(req, res) {
    var posts = [];
    var postCount;
    var useres {};
    Segment.find({author: req.params.name}, function(err, segments){
      if (err) res.status(500).send({msg: 'could not find segments'});
        postCount = segments.length < 25 ? segments.length : 25;
        for(var i = 0; i < postCount; i++) {
          posts.push(segments[i]);
        }
        User.findOne({username: req.params.name}, function(err, user) {
          useres.name = user.username;
          useres.posts = posts;
          useres.location = user.location;
          useres.createdAt = user.createdAt;

          res.json(useres);
        });
    });
  });
};
