const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")
const isAdmin = require('./isAdmin');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})



router.get('/user', urlencodedParser, async (req, res) => {
    res.render('user', {
      title: 'Personal area',
      bootstrap: true,
      activeNavPers: true,
      firstname: req.session.firstName,
      secondname: req.session.secondName,
      email: req.session.email,
      role: req.session.loginStatus,
      id_user: req.session.id_user,
      admin: isAdmin.isAdmin(req.session.loginStatus)
    })
  })

module.exports = router

