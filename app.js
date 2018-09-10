const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const registrationLogic = require('./registration_number_factory.js')


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

  app.get('/',function(req,res){
      res.render('index', )
  } )

  let PORT = process.env.PORT || 3020

app.listen(PORT, function () {
  console.log('App starting on port', PORT)
})