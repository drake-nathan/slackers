const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

describe('Channels', () => {
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

  describe('/GET api/channels/:channel/posts', () => {});

  describe('/POST api/channels/:channel/posts', () => {});

  describe('/GET api/channels/:channel/users', () => {});

  describe('/DELETE api/channels/:channel/posts', () => {});

  describe('/POST api/channels/:channel/posts', () => {});
});
