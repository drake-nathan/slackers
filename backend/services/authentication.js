// this line sets up passport with the local and jwt strategies
require('./passport');

const passport = require('passport');

const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = {
  requireSignIn,
  requireAuth,
};
