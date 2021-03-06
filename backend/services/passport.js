const passport = require('passport');

const { ExtractJwt } = require('passport-jwt');

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const keys = require('../config/keys');
const { pool, strings } = require('../queries/queries');

const localLogin = new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    pool.query(strings.oneUser(email), (err, results) => {
      if (err) {
        return done(err);
      }
      const found = results.rows.find((u) => u.password_temp === password);

      if (found) {
        done(null, found);
      } else {
        done(null, false);
      }
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
  pool.query(strings.userById(payload.sub), (err, results) => {
    if (err) {
      return done(err);
    }
    if (results.rows.length === 1) {
      done(null, results.rows[0]);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
