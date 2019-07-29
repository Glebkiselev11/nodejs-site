const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")
const isAdmin = require('./isAdmin');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get('/register', urlencodedParser, async (req, res) => {
    res.render('register', {
      title: 'register',
      bootstrap: true,
      users: await queryDb.getUsers(),
      activeNavReg: true
  })
})

module.exports = router;