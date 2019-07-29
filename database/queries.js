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

module.exports.setUsers = async function setUsers (first_name, role, second_name, email, pass) {
  try {
    await pool.query(`Insert into users (first_name, role, second_name, email, password) values('${first_name}', '${role}', '${second_name}', '${email}', '${pass}') `)
    } catch (e) {
      console.log(`Error in setUsers(): ${e}`);
    }
}

module.exports.setPost = async function setPost (title, post_text, author) {
  try {
    await pool.query(`Insert into posts (title, post_text, author) values('${title}', '${post_text}', '${author}')`)
    } catch (e) {
      console.log(`Error in setUsers(): ${e}`);
    }
}

module.exports.getPosts = async function getPosts() {
  try {
  const result = await pool.query(`select * from posts`)
    if (result.rowCount) {
      return result.rows;
    }

  } catch (e) {
    console.log(`Error in getPosts(): ${e}`);
  }
  return [];
}


module.exports.login = async function login (email, pass) {
  try {
  const result = await pool.query(`SELECT * from users where email = '${email}' AND password = '${pass}'`)

  // console.log (result.rows[0])


  if (result.rowCount) {
    return result.rows[0];
  } 
    return 'No';

  } catch (e) {
    console.log(`Error in login(): ${e}`);
  }
  return [];
}
