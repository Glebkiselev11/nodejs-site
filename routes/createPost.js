const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")
const isAdmin = require('./isAdmin');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})

router.post('/createpost', urlencodedParser, async (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const {title, post_text} = req.body;
    await queryDb.setPost(title, post_text, `${req.session.firstName} ${req.session.secondName}`);
    res.render('post-success', {
      title: 'Personal area',
      bootstrap: true,
      firstname: req.session.firstName,
      secondname: req.session.secondName,
      role: req.session.loginStatus,
      admin: isAdmin(req.session.loginStatus)
  
    })
    
})

module.exports = router;