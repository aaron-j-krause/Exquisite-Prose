'use strict';

process.env.MONGO_URI = 'mongodb://localhost/stories_test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
require('../server.js');

var expect = chai.expect;

describe('Story Route', function() {
  var token;
  var storyId;
  before(function(done){
    chai.request('localhost:3000')
      .post('/user/create_user')
      .send({email: 'example@email.com', password: '1234abc',
        screenname: 'exampleUser', location: 'examplion'})
      .end(function(err, res){
        token = res.body.eat;
        chai.request('localhost:3000')
          .post('/segments/new_segment')
          .set('eat', token)
          .send({
            author: 'exampleUser',
            levelId: 0,
            postBody: 'test post',
            storyName: 'test story'
          })
          .end(function(err, res){
            storyId = res.body._id;
            done();
          });
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should get a story by id', function(done) {
    chai.request('localhost:3000')
      .get('/story/' + storyId)
      .end(function(err, res) {
        var story = res.body.story;
        var levels = res.body.levels;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(story.name).to.eql('test story');
        expect(levels).to.not.be.empty; //jshint ignore:line
        expect(story.firstSegment).to.have.property('levelId');
        done();
      });
  });

  it('should get a random story', function(done) {
    chai.request('localhost:3000')
      .get('/story/incomplete/random')
      .end(function(err, res) {
        var story = res.body.story;
        var levels = res.body.levels;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(story.name).to.eql('test story');
        expect(levels).to.not.be.empty; //jshint ignore:line
        expect(story.isComplete).to.eql(false);
        done();
      });
  });

  it('should not be able to get a complete story', function(done) {
    chai.request('localhost:3000')
      .get('/story/complete/list')
      .end(function(err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});
