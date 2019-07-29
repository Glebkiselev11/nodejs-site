const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")
const isAdmin = require('./isAdmin');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get('/', urlencodedParser, async (req, res) => {
  const posts = await queryDb.getPosts();
  posts.reverse()
  res.render('index', {
    title: 'Home page',
    activeNavIndex: true,
    logIn: true,
    firstname: req.session.firstName,
    secondname: req.session.secondName,
    role: req.session.loginStatus,
    posts,
    admin: isAdmin.isAdmin(req.session.loginStatus)
    
  });
});


module.exports = router;