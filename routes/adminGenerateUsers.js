const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})

// Генерация 10 рандомных пользователей

router.get('/admin/generate-random-users', urlencodedParser, async (req, res) => {

    if(req.session.loginStatus === 'admin') {
      await queryDb.setRandomUsers();
      res.redirect('/admin');
    } else {
      res.redirect('/')
    } 
  })

module.exports = router;