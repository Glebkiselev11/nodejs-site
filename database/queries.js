const pool = require('./dbConnection');

module.exports.getUsers = async function getUsers() {
  try {
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


module.exports.setRandomUsers = async function setRandomUsers () {
  const first_names = ['gleb', 'ivan', 'evgeniy', 'misha', 'oleg', 'john', 'sam', 'ilya', 'alex', 'dima', 'mike', 'garret', 'mark', 'dennis', 'dan', 'harry', 'danila', 'adam', 'vladimir', 'vova'];
  const second_names = ['kiselev', 'makeev', 'ivanov', 'grigoriev', 'jons', 'doe', 'webb', 'enerson', 'grey', 'black', 'white', 'geyts', 'potter', 'kovalenko', 'durov', 'putin'];

  for (let i = 0; i < 10; i++) {
    const first_name = Math.floor(Math.random() * first_names.length);
    const second_name = Math.floor(Math.random() * second_names.length);



    try {
      await pool.query(`Insert into users (first_name, role, second_name, email, password) values('${first_names[first_name]}', 'user', '${second_names[second_name]}', '${second_names[second_name]}@example.com', '${first_names[first_name]}${second_names[second_name]}') `)
     } catch (e) {
         console.log(`Error in set10RandomUsers(): ${e}`);
     }
  }


  
}