const pool = require('./dbConnection');

module.exports.getUsers = async function getUsers() {
  try {
  //  const result = await pool.query(`select * from users where first_name = ${name}`)
  const result = await pool.query(`select * from users`)
    if (result.rowCount) {
      return result.rows;
    }

  } catch (e) {
    console.log(`Error in getUsers(): ${e}`);
  }
  return [];
}

module.exports.setUsers = async function setUsers (first_name, role, second_name) {
  try {
    await pool.query(`Insert into users (first_name, role, second_name) values('${first_name}', '${role}', '${second_name}')`)
    } catch (e) {
      console.log(`Error in setUsers(): ${e}`);
    }
}

module.exports.setPost = async function setUsers (title, post_text, author) {
  try {
    await pool.query(`Insert into posts (title, post_text, author) values('${title}', '${post_text}', '${author}')`)
    } catch (e) {
      console.log(`Error in setUsers(): ${e}`);
    }
}


module.exports.login = async function login (first_name, second_name) {
  try {
  const result = await pool.query(`SELECT * from users where first_name = '${first_name}' AND second_name = '${second_name}'`)

  let statusToString = String(result.rows[0].role).replace(/\s/g, '');

  if( statusToString === 'null') {
    statusToString = 'Guest';
  }


  if (result.rowCount) {
    return statusToString;
  } 
    return 'No';

  } catch (e) {
    console.log(`Error in login(): ${e}`);
  }
  return [];
}
