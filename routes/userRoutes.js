'use strict';

var User = require('../models/User');
var Segment = require('../models/Segment');

module.exports = function(app, passport, appSecret) {
  app.post('/create_user', function(req, res) {
    var newUser = new User();
    newUser.createdAt = new Date().toString();
    newUser.basic.email = req.body.email;
    newUser.basic.password = newUser.generateHash(req.body.password);
    newUser.screenname = req.body.screenname;
    newUser.location = req.body.location;

    newUser.save(function(err, user) {
      if(err) return res.status(500).send({msg:'could not save'});

      user.generateToken(appSecret, function(err, token) {
        if (err) return res.status(500).send({msg: 'could not generate token'});
        res.json({eat: token});
      })
    });
  });

  app.get('/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(appSecret, function(err, token) {
      if (err) return res.status(500).send({msg: 'could not generate token'});
      res.json({eat: token});
    })
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

  app.get('/dev/allUsers', function(req, res) {
    User.find({}, function(err, users){
      if (err) return res.status(500).send('could not find');
      res.send(users);
    });
  });
};
