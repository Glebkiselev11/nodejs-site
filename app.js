const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require("body-parser")
const session = require("express-session")
const queryDb = require('./database/queries')


const urlencodedParser = bodyParser.urlencoded({extended: false})
const app = express()

app.use(express.static('public'));

app.use(session({
  name: 'sid',
  saveUninitialized: false,
  secret: 'keyboard cat',
  resave: true,
  cookie: { 
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24
   }
}))



app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');





// Routing
app.get('/', urlencodedParser, async (req, res) => {
  
  res.render('index', {
    title: 'Home page',
    activeNavIndex: true,
    logIn: true,
    firstname: req.session.firstName,
    secondname: req.session.secondName,
    role: req.session.loginStatus
    
  });
});


// Логин
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    activeNavLogin: true,
    message: ''
    
  });
});

app.post("/login", urlencodedParser, async (req, res) => {
  if(!req.body) return res.sendStatus(400);
  
  const firstName = req.body.firstname;
  const secondName = req.body.secondname
  
  // Проверка в базе данных на существование данного пользователя
  const loginStatus = await queryDb.login(firstName, secondName);
  
  if (loginStatus === 'admin') {
    res.send(await queryDb.getUsers());
  } else if (loginStatus === 'Guest' || loginStatus === 'user') {
    req.session.firstName = firstName;
    req.session.secondName = secondName;
    req.session.loginStatus = loginStatus;

    res.redirect('/personalarea');
  } else {
    res.render('login' , {
      title: 'Login',
      activeNavLogin: true,
      message: 'Такого пользователя не существует =( совсем'
    })
  }
})

app.get('/add-post', urlencodedParser, async (req, res) => {
  res.render('add-post', {
    title: 'Add post',
    bootstrap: true,
    firstname: req.session.firstName,
    secondname: req.session.secondName,
    role: req.session.loginStatus
  })
})

app.get('/personalarea', urlencodedParser, async (req, res) => {
  res.render('personalarea', {
    title: 'Personal area',
    bootstrap: true,
    firstname: req.session.firstName,
    secondname: req.session.secondName,
    role: req.session.loginStatus
  })
})

app.get('/register', urlencodedParser, async (req, res) => {
  res.render('register', {
    title: 'register',
    bootstrap: true,
    users: await queryDb.getUsers(),
    activeNavReg: true
})
})

app.post("/register", urlencodedParser, async (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const {firstname, secondname} = req.body;
    res.render('regist-success')
    await queryDb.setUsers(firstname, 'user', secondname);
});

// add posts

app.post('/createpost', urlencodedParser, async (req, res) => {
  if(!req.body) return res.sendStatus(400);
  const {title, post_text} = req.body;
  await queryDb.setPost(title, post_text, `${req.session.firstName} ${req.session.secondName}`);
  res.render('post-success', {
    title: 'Personal area',
    bootstrap: true,
    firstname: req.session.firstName,
    secondname: req.session.secondName,
    role: req.session.loginStatus

  })
})

app.get('/logout', urlencodedParser, async (req, res) => {
  if(req.session) {
    req.session.destroy(() => {
      res.redirect('/');
    })
  } else {
    res.redirect('/');
  }
})


const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`Express is working on port port ${port}`)
});







