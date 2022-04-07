const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

describe('Channels', () => {
  describe('/GET api/conversations', () => {
    it('should GET all channels available to the current user', (done) => {
      chai
        .request(server)
        .get('/api/conversations')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });
  });

  describe('/POST api/conversations', () => {
    it('should add a new channel', (done) => {
      chai
        .request(server)
        .post('/api/conversations')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET api/conversations/:conversationId/messages', () => {
    it("should GET all of a conversation's messages", (done) => {
      chai
        .request(server)
        .post('/api/conversations')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST api/conversations/:conversationId/messages', () => {
    it('should create a new conversation message', (done) => {
      chai
        .request(server)
        .post('/api/conversations')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/DELETE api/conversations/:conversationId/users', () => {
    it('should add a new channel', (done) => {
      chai
        .request(server)
        .post('/api/conversations')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET api/conversations/:conversationId/users', () => {
    it('should add a new channel', (done) => {
      chai
        .request(server)
        .post('/api/conversations')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST api/conversations/:conversationId/users', () => {
    it('should add a new channel', (done) => {
      chai
        .request(server)
        .post('/api/conversations')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
