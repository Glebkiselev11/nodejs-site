const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})


router.get('/admin/update', urlencodedParser, async (req, res) => {
    if(req.session.loginStatus == 'admin') {
      const {firstname, secondname, email, pass, id_user} = req.query;
      await queryDb.updateUserById(id_user, firstname, secondname, email, pass);
      res.redirect('/admin')
    } else {
      res.redirect('/')
    }
  })



module.exports = router;