const express = require('express')
const bodyParser = require("body-parser")
const queryDb = require("../database/queries")
const isAdmin = require('./isAdmin');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get('/admin', urlencodedParser, async (req, res) =>{
        if(req.session.loginStatus === 'admin') {
        const usersList = await queryDb.getUsers();
        
        res.render('adminpage', {
            title: 'Admin panel',
            users: usersList,
            bootstrap: true,
            activeNavAdmin: true,
            firstname: req.session.firstName,
            secondname: req.session.secondName,
            role: req.session.loginStatus,
            admin: isAdmin.isAdmin(req.session.loginStatus)
        })
            
        } else {
        res.redirect('/')
        }
})




module.exports = router;

