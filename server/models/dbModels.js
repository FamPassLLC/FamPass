const { Pool } = require('pg');
const config = require('../../config');
const PG_URI = config.URI;
const pool = new Pool({ connectionString: PG_URI });

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
