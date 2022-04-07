if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  module.exports = require('./prod');
} else {
  // eslint-disable-next-line global-require
  module.exports = require('./dev');
}
