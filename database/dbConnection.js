const pg = require('pg');

const config = {
  user: 'postgres',
  database: 'postgres',
  password: 'barneo24', 
  host: 'localhost', 
  port: '5432'
};

const pool = new pg.Pool(config);

pool.on('error',  (err, client) => {
  console.error('idle client error', err.message, err.stack);
});

module.exports.query = (text, values, callback) => {
  return pool.query(text, values, callback);
};

module.exports.connect =  (callback) => {
  return pool.connect(callback);
  
};