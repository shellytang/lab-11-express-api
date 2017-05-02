'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function () {

// ++++++++ POST +++++++++
  describe('POST method', function() {
    describe('a properly formatted request', function() {
      it('should return a 200 response' , (done) => {
        chai.request(server)
        .post('/api/cat')
        .send({name: 'milo', mood: 'happy'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('should return a response object', (done) => {
        chai.request(server)
        .post('/api/cat')
        .send({name: 'milo', mood: 'happy'})
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
      });
    });
    describe('a request with no body provided or invalid body', function() {
      it('should return a 400 error response', (done) => {
        chai.request(server)
        .post('/api/cat')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
    describe('an unregistered route', function() {
      it('should return a 404 error ', (done) => {
        chai.request(server)
        .get('/api/dog')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });

  // +++++++++++++++++++++GET ++++++++++++++++++++++++++++++
  describe('GET method', function() {

    describe('/api/cat route', function() {

      describe('an improperly formatted request', function() {
        it('should return an error response 400 of "not found" if no id provided', (done) => {
          chai.request(server)
          .get('/api/cat/foo')
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
        });
      });
      describe('a request for an id that was not found', function() {
        it('should return an error response 400 of "not found"', (done) => {
          chai.request(server)
          .get('/api/cat')
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
        });
      });

      describe('a property formatted request', function() {
        it('should return a 200 response', done => {
          chai.request(server)
          .get(`/api/cat/02afc632-2952-4ea7-b384-bf3d75d0e935`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });

        describe('unregistered route', function() {
          it('should respond with 404 for an id not found', () => {
            chai.request(server)
            .get('/api/dog')
            .end((err, res) => {
              expect(res).to.have.status(404);
            });
          });
        });

      });
    });
  });

  // ++++++++++++++ PUT +++++++++++++++++++++++++++
  describe('PUT method', function() {
    describe('/api/cat route', function() {

      describe('a properly formatted request', function() {

        it('should return a 200 response', done => {
          chai.request(server)
          .put('/api/cat/02afc632-2952-4ea7-b384-bf3d75d0e935')
          .send({name: 'mia', mood: 'happy'})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('should return a response body object', done => {
          chai.request(server)
          .put('/api/cat/02afc632-2952-4ea7-b384-bf3d75d0e935')
          .send({name: 'mia', mood: 'happy'})
          .end((err, res) => {
            expect(res).to.be.an('object');
            done();
          });
        });
        describe('unregistered route', function() {
          it('should return a 404 for unregistered route', done => {
            chai.request(server)
            .put('/api/dog')
            .send({name: 'mia', mood: 'happy'})
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
          });
        });
      });
    });
  });
  //
  // ++++++++++++++++++++++++ DELETE ++++++++++++++++++++++++
  // describe('DELETE method', function() {
  //
  //   describe('/api/cat route', function() {
  //
  //     describe('a response with a valid id', function() {
  //       it('should return a 204 response', done => {
  //         chai.request(server)
  //         .delete('/api/cat/1e2ad6d4-71a1-44b9-ba7a-40775aa8b656')
  //         .end((err, res) => {
  //           expect(res).to.have.status(204);
  //           done();
  //         });
  //       });
  //     });
  //     describe('a response for a valid request made with an id that was not found', function() {
  //       it('should return a 404 response', done => {
  //         chai.request(server)
  //         .delete('/api/cat/1e2ad6d4-71a1-44b9-ba7a-407')
  //         .end((err, res) => {
  //           expect(res).to.have.status(404);
  //           done();
  //         });
  //       });
  //     });
  //     describe('an unregistered request', function() {
  //       it('should return a 404 request', done => {
  //         chai.request(server)
  //         .delete('/api/dog')
  //         .end((err, res) => {
  //           expect(res).to.have.status(404);
  //           done();
  //         });
  //       });
  //     });
  //   });
  // });

});
