const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})



router.get('/admin/getuser', urlencodedParser, async (req, res) => {

    if(req.session.loginStatus === 'admin') {
      const query = await queryDb.getUserById(req.query.id_user);
      res.send(query);
    } else {
      res.redirect('/');
    } 
  })

  module.exports = router;