const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

describe('Direct-Messages', () => {
  describe('/GET api/channels', () => {
    it('should GET all channels available to the current user', (done) => {
      chai
        .request(server)
        .get('/api/channels')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });
  });

  describe('/GET api/direct-messages', () => {});

  describe('/GET api/direct-messages/:user/messages', () => {});

  describe('/POST api/direct-messages/:user/messages', () => {});
});

describe('Login', () => {
  describe('/POST auth/signin', () => {});
});
