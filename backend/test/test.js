let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

let should = chai.should();

describe('Channels', () => {
  
  describe('/GET api/channels', () => {
    it('should GET all channels available to the current user', done => {
      chai
        .request(server)
        .get('/api/channels')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        })
    })
  })

  describe('/GET api/:channel/posts', () => {
    
  })

  describe('/POST api/:channel/posts', () => {
    
  })

  describe('/GET api/:channel/users', () => {
    
  })

  describe('/DELETE api/:channel/posts', () => {
    
  })

  describe('/POST api/:channel/posts', () => {
    
  })

})

describe('Direct-Messages', () => {
  
  describe('/GET api/channels', () => {
    it('should GET all channels available to the current user', done => {
      chai
        .request(server)
        .get('/api/channels')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        })
    })
  })

  describe('/GET api/direct-messages', () => {
    
  })

  describe('/GET api/direct-messages/:user/messages', () => {
    
  })

  describe('/POST api/direct-messages/:user/messages', () => {
    
  })

})

describe('Login', () => {
  
  describe('/POST auth/signin', () => {

  })


})