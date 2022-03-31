const passport = require('passport');

const { ExtractJwt } = require('passport-jwt');

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const keys = require('../config/keys');
const dummyUsers = require('../test-data.js').users;
const { client, strings } = require('../queries');

// const {parseEncrypted} = require('../db/models')

const localLogin = new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    // TODO search the db for this username and password, and call done with that user if found.
    // TODO make a decrypt passwords function to use with the database and encrypt the data.
    client.connect((err) => {
      if (err) throw err;
      client.query(strings.oneUser(email, password), (err, results) => {
        done(null, results.rows[0]);
      });
    });
  }
);

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.TOKEN_SECRET,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  // TODO implement this w/ PG database.
  const user = dummyUsers.find((u) => u.userId === parseInt(payload.sub));
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
