const jwt = require('jwt-simple');
const keys = require('../config/keys');

function tokenGenerator(user) {
  return jwt.encode(
    {
      sub: user.user_id,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    keys.TOKEN_SECRET
  );
}

exports.signin = function (req, res, next) {
  // passport already authenticated this user.
  // We just need to give them a token
  res.send({
    user: { email: req.user.email, name: req.user.name },
    auth_token: tokenGenerator(req.user),
  });
};

exports.currentUser = function (req, res) {
  const user = {
    email: req.user.email,
    token: tokenGenerator(req.user),
  };

  res.send(user);
};
