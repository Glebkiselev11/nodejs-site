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


// Провека является ли пользователь админом, чтобы добавлять админ элементы 
function isAdmin (status) {
  if (status === 'admin') {
    return true
  } 
  return false  
}





// Routing
app.get('/', urlencodedParser, async (req, res) => {
  const posts = await queryDb.getPosts();
  posts.reverse()
  res.render('index', {
    title: 'Home page',
    activeNavIndex: true,
    logIn: true,
    firstname: req.session.firstName,
    secondname: req.session.secondName,
    role: req.session.loginStatus,
    posts,
    admin: isAdmin(req.session.loginStatus)
    
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

  const email = req.body.email;
  const pass = req.body.pass;
  
  // Проверка в базе данных на существование данного пользователя
  const loginStatus = await queryDb.login(email, pass);
  
  if (loginStatus.role === 'admin') {
    req.session.firstName = loginStatus.first_name;
    req.session.secondName = loginStatus.second_name;
    req.session.loginStatus = loginStatus.role;
    res.redirect('/admin')
  } else if (loginStatus.role === 'Guest' || loginStatus.role === 'user') {
    req.session.firstName = loginStatus.first_name;
    req.session.secondName = loginStatus.second_name;
    req.session.loginStatus = loginStatus.role;

    res.redirect('/personalarea');
  } else {
    res.render('login' , {
      title: 'Login',
      activeNavLogin: true,
      message: 'Такого пользователя не существует'
    })
  }
})



app.get('/admin', urlencodedParser, async (req, res) => {
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
      admin: isAdmin(req.session.loginStatus)
    })
        
  } else {
    res.redirect('/')
  }
})

app.get('/admin/generate-random-users', urlencodedParser, async (req, res) => {

  if(req.session.loginStatus === 'admin') {
    await queryDb.setRandomUsers();
    res.redirect('/admin');
  } else {
    res.redirect('/')
  }
  
})

app.get('/add-post', urlencodedParser, async (req, res) => {
  res.render('add-post', {
    title: 'Add post',
    bootstrap: true,
    firstname: req.session.firstName,
    secondname: req.session.secondName,
    role: req.session.loginStatus,
    activeNavAddPost: true,
    admin: isAdmin(req.session.loginStatus)
  })
})

app.get('/personalarea', urlencodedParser, async (req, res) => {
  res.render('personalarea', {
    title: 'Personal area',
    bootstrap: true,
    activeNavPers: true,
    firstname: req.session.firstName,
    secondname: req.session.secondName,
    role: req.session.loginStatus,
    admin: isAdmin(req.session.loginStatus)
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
    const {firstname, secondname, email, pass} = req.body;
    res.render('regist-success')
    await queryDb.setUsers(firstname, 'user', secondname, email, pass);
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
    role: req.session.loginStatus,
    admin: isAdmin(req.session.loginStatus)

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







