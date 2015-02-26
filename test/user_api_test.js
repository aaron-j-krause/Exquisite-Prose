'use strict';

process.env.MONGO_URI = 'mongodb://localhost/exq_prose_test';
require('../server.js');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

describe('user api end point', function() {
  before(function(done) {
    chai.request('localhost:3000')
      .post('/user/create_user')
      .send({email: 'example@email.com', password: '1234abc',
        screenname: 'exampleUser', location: 'examplion'})
      .end(function(err, res) {
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
        expect(res.body.createdAt).to.not.equal(null);
        expect(res.body.basic.email).to.eql('test@email.com');
        expect(res.body.basic.password).to.eql('1234abc');
        expect(res.body.screenname).to.eql('testUser');
        expect(res.body.location).to.eql('Washington');
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
});
