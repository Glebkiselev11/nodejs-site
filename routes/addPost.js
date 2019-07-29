const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")
const isAdmin = require('./isAdmin');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})


router.get('/add-post', urlencodedParser, async (req, res) => {
    res.render('add-post', {
      title: 'Add post',
      bootstrap: true,
      firstname: req.session.firstName,
      secondname: req.session.secondName,
      role: req.session.loginStatus,
      activeNavAddPost: true,
      admin: isAdmin.isAdmin(req.session.loginStatus)
    })
  })

  module.exports = router;