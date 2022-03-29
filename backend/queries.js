// instructions to setting up test database below
// https://parsity-fulltime-3.atlassian.net/jira/software/projects/PFTC3AP/boards/1?selectedIssue=PFTC3AP-9
const { Pool } = require('pg');

const pool = new Pool({
  database: 'test',
});

const getDMs = (request, response) => {
  const query = {
    text: 'SELECT * FROM thread WHERE type = $1',
    values: ['dm'],
  };

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    response.send(results.rows);
  });
};

module.exports = { getDMs };
