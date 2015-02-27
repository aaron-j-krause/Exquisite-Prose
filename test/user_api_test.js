'use strict';

process.env.MONGO_URI = 'mongodb://localhost/exq_prose_test';
require('../server.js');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

describe('user api end point', function() {
  var token;
  before(function(done){
    chai.request('localhost:3000')
      .post('/user/create_user')
      .send({email: 'example@email.com', password: '1234abc',
        screenname: 'exampleUser', location: 'examplion'})
      .end(function(err, res){
        token = res.body.eat;
        done();
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should respond to a post request to create_user', function(done) {
    chai.request('localhost:3000/user')
      .post('/create_user')
      .send({email: 'test@email.com', password: '1234abc',
        screenname: 'testUser', location: 'Washington'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.user).to.eql('testUser');
        expect(res.body.eat).to.exist;
        done();
      });
  });

  it('should find a user by screenname', function(done) {
    chai.request('localhost:3000')
      .get('/user/exampleUser')
      .end(function(err, res) {
        var user = res.body.user;
        var segments = res.body.segments;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(user.screenname).to.eql('exampleUser');
        expect(segments).to.be.empty; //jshint ignore:line
        done();
      });
  });
  it('allow a user to log in', function(done){
    chai.request('localhost:3000')
      .get('/user/sign_in')
      .auth('test@email.com', '1234abc')
      .end(function(err, res){
        var user = res.body.user;
        var segments = res.body.segments;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.eat).to.exist;
        done();
      });
  });
});
