
const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")
const isAdmin = require('./isAdmin');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})



router.post("/login", urlencodedParser, async (req, res) => {
    if(!req.body) return res.sendStatus(400);
  
    const email = req.body.email;
    const pass = req.body.pass;
    
    // Проверка в базе данных на существование данного пользователя
    const loginStatus = await queryDb.login(email, pass);
    
    if (loginStatus.role === 'admin') {
      req.session.firstName = loginStatus.first_name;
      req.session.secondName = loginStatus.second_name;
      req.session.loginStatus = loginStatus.role;
      req.session.id_user = loginStatus.id;
      req.session.email = loginStatus.email;
      res.redirect('/admin')
    } else if (loginStatus.role === 'Guest' || loginStatus.role === 'user') {
      req.session.firstName = loginStatus.first_name;
      req.session.secondName = loginStatus.second_name;
      req.session.loginStatus = loginStatus.role;
      req.session.id_user = loginStatus.id;
      req.session.email = loginStatus.email;
   
      res.redirect('/user');
    } else {
      res.render('login' , {
        title: 'Login',
        activeNavLogin: true,
        message: 'Такого пользователя не существует'
      })
    }
  })


  module.exports = router;