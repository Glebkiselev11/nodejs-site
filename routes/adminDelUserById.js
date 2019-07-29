const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get('/admin/deleteuser', urlencodedParser, async (req, res) => {

    if(req.session.loginStatus === 'admin') {
      await queryDb.delUserById(req.query.id_user);
      res.redirect('/admin')
    } else {
      res.redirect('/');
    } 
  })

module.exports = router;