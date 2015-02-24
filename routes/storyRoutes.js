var mongoose = require('mongoose');
var User = require('./../User.js');
var Segment = require('./../Segment.js');

module.exports = function(router){
  router.get('/:story', function(req, res){
    res.send('LOOKS LIKE WE MADE IT')
  })
}