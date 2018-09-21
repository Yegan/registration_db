const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const registrationLogic = require('./regfunc.js')
const RegRoutes = require('./routes/routes.js')
const postgres = require('pg')
const Pool = postgres.Pool

const connectionString = process.env.DATABASE_URL || 'postgres://coder:pg123@localhost:5432/reg_data'

const pool = new Pool({
  connectionString
})

// making an instance for the functional logic and the database

const regDB = registrationLogic(pool)
const RegRoute = RegRoutes(regDB)

// Handlebar engine allowing for templating of data

app.engine('handlebars', exphbs({
  defaultLayout: 'main'

}))

app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}))
// initialise session middleware - flash-express depends on it
app.use(session({
  secret: '<add a secret string here>',
  resave: false,
  saveUninitialized: true
}))

// initialise the flash middleware
app.use(flash())
app.use(bodyParser.json())

// This route displays the registration homepage
app.get('/', RegRoute.home)

// This route adds the registration number into the route
app.post('/reg_number', RegRoute.regCheckRoute)
app.post('/location', RegRoute.locationAdd)
app.get('/filter/:tag', RegRoute.filterReg)
app.get('/resetReg', RegRoute.resetAll)


let PORT = process.env.PORT || 3020

app.listen(PORT, function () {
  console.log('App starting on port', PORT)
})
