const express = require('express')
const bodyParser = require("body-parser")

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})


router.get('/logout', urlencodedParser, async (req, res) => {
    if(req.session) {
      req.session.destroy(() => {
        res.redirect('/');
      })
    } else {
      res.redirect('/');
    }
})

module.exports = router;