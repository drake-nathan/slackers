const keys = require('../config/keys');
const passport = require('passport');
// TODO should put the jwt secret in this file

const { ExtractJwt } = require('passport-jwt');

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const localLogin = new LocalStrategy((username, password, done) => {
  // TODO search the db for this username and password, and call done with that user if found.
  // login automatically for now.
  done(null, {});
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.TOKEN_SECRET,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  // TODO implement this w/ PG database.
  done(null, {});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
