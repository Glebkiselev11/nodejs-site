const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})


router.post("/register", urlencodedParser, async (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const {firstname, secondname, email, pass} = req.body;
    res.render('regist-success')
    await queryDb.setUsers(firstname, 'user', secondname, email, pass);
});

module.exports = router;