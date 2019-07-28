const pg = require('pg');

const config = {
  user: 'dzyndakohodrhg',
  database: 'ddh62e3vm69ef0',
  password: '3386c08c0f1977f7d9c6651658ca55d09918059d6a675b4164acfc2619e6beec', 
  host: 'ec2-54-246-84-100.eu-west-1.compute.amazonaws.com', 
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