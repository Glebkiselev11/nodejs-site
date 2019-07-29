const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require("body-parser")
const session = require("express-session")
const queryDb = require('./database/queries')

const routes = require('./routes');


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

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Главная странца
app.get('/', routes.getIndexPage);

app.get('/register', routes.getRegisterPage)
app.post("/register", routes.register);
app.get('/login', routes.getLoginPage)
app.post("/login", routes.login)

// Генерация страницы пользователя
app.get('/user', routes.user)


// Админка
app.get('/admin', routes.admin)
// Генерация 10 рандомных пользователей
app.get('/admin/generate-random-users', routes.adminGenerateUsers)
// Поиск пользователя по id
app.get('/admin/getuser', routes.adminSerchUserById)
// Удаления пользователя по id
app.get('/admin/deleteuser', routes.adminDelUserById)
// Изменения данных для пользователя
app.get('/admin/update', routes.adminUpdateUserById)


app.get('/add-post', routes.addPost)
app.post('/createpost', routes.createPost)



app.get('/logout', routes.logout);

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`Express is working on port port ${port}`)
});







