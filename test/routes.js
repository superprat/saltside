
const should = require('should');
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const should_http = require('should-http');

describe('Routing', function() {
var url = 'http://localhost:3000';

var crow = {
        name: 'Crow',
        family: 'Black',
        continents: ['Asia','Africa']
      };


  describe('Birds', function() {

    //Test for POST /birds
    it('should save bird data', function(done) {


    request(url)
  .post('/birds')
  .expect('Content-Type', /json/)
  .send(crow)
  .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(201);
          res.body.should.have.property('id');
          res.body.should.have.property('added');
          res.body.should.have.property('visible',false);
          crow.id = res.body.id;
          done();
        });
    });


    //Test for Get /Bird
    it('should fetch back data that was posted', function(done){

      request(url)
      .get('/birds/'+crow.id)
      .send()
      .expect('Content-Type',/json/)
      .expect(200)
      .end(function(err, res){
          if (err) {
            throw err;
          }
          res.body.should.have.property('id',crow.id);
          res.body.should.have.property('name',crow.name)
          res.body.should.have.property('family',crow.family)
          res.body.should.have.property('continents',crow.continents)
          res.body.should.have.property('added');
          res.body.should.have.property('visible',false);
          crow.id = res.body.id;
          done();
        });
    });

    //Test for Delete /bird
    it('should delete the bird that was posted', function(done){

      request(url)
      .delete('/birds/'+crow.id)
      .send()
      .expect(200)
      .end(function(err, res){
          if (err) {
            throw err;
          }
          done();
        });
    });

    it('should return a 404 status code when deleting the bird that was already deleted', function(done){

      request(url)
      .delete('/birds/'+crow.id)
      .send()
      .expect(404)
      .end(function(err, res){
          if (err) {
            throw err;
          }
          done();
        });
    });

    //Test for get /bird
    it('should return a 404 status code when fetch a bird that was already deleted', function(done){

      request(url)
      .get('/birds/'+crow.id)
      .send()
      .expect(404)
      .end(function(err, res){
          if (err) {
            throw err;
          }
          done();
        });
    });



    //Test for GET /birds
    it('should get all visible bird data', function(){

      request(url)
      .get('/birds')
      .send()
      .expect('Content-Type',/json/)
      .expect(200)
      .end(function(err,res){
        if(err){
          throw err;
        }
        res.body.should.be.instanceof(Array);
        res.body.forEach( function (birdItem)
        {
            birdItem.should.have.property('name');
            birdItem.should.have.property('visible',true);
            birdItem.should.have.property('family');
            birdItem.should.have.property('continents').with.lengthOf(1);
        });



        done();
      });

    });

  });
});