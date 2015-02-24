'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User');

module.exports = function(app) {
  app.use(bodyparser.json());
  app.post('/create_user', function(req, res) {
    var newUser = new User();
    newUser.basic.email = req.body.email;
    newUser.basic.password = req.body.password;
  });
};
