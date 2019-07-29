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


// admin запросы

module.exports.setRandomUsers = async function setRandomUsers () {
  const first_names = ['gleb', 'ivan', 'evgeniy', 'misha', 'oleg', 'john', 'sam', 'ilya', 'alex', 'dima', 'mike', 'garret', 'mark', 'dennis', 'dan', 'harry', 'danila', 'adam', 'vladimir', 'vova'];
  const second_names = ['kiselev', 'makeev', 'ivanov', 'grigoriev', 'jons', 'doe', 'webb', 'enerson', 'grey', 'black', 'white', 'geyts', 'potter', 'kovalenko', 'durov', 'putin'];

  for (let i = 0; i < 10; i++) {
    const first_name = Math.floor(Math.random() * first_names.length);
    const second_name = Math.floor(Math.random() * second_names.length);



    try {
      await pool.query(`Insert into users (first_name, role, second_name, email, password) values('${first_names[first_name]}', 'user', '${second_names[second_name]}', '${first_names[first_name]}${second_names[second_name]}@example.com', '${first_names[first_name]}${second_names[second_name]}') `)
     } catch (e) {
         console.log(`Error in set10RandomUsers(): ${e}`);
     }
  }
}

module.exports.getUserById = async function getUserById(id) {
  try {
  const result = await pool.query(`select * from users where id = ${id}`)
    if (result.rowCount) {
      return result.rows;
    }

  } catch (e) {
    console.log(`Error in getUsers(): ${e}`);
  }
  return [];
}

module.exports.delUserById = async function delUserById (id) {
  try {
    const result = await pool.query(`delete from users where id = ${id}`)
      if (result.rowCount) {
        return result.rows;
      }
  
    } catch (e) {
      console.log(`Error in delUserById(): ${e}`);
    }
    return [];
}


module.exports.updateUserById = async function updateUserById (id_user, first_name, second_name, email, pass) {
  try {
    if (first_name) {
      await pool.query(`Update users set first_name = '${first_name}' where id = ${id_user}`)
    }
    if (second_name) {
      await pool.query(`Update users set second_name = '${second_name}' where id = ${id_user}`)
    }

    if (email) {
      await pool.query(`Update users set email = '${email}' where id = ${id_user}`)
    }
    
    if (pass) {
      await pool.query(`Update users set password = '${pass}' where id = ${id_user}`)
    }

  } catch (e) {
    console.log(`Error in updateUsersById(): ${e}`);
  }

  return []
}