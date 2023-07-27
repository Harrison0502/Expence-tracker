const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const methodOverride = require('method-override')
require('./config/mongoose')
const routes=require('./routes')

app.engine('hbs', exphbs({
  helpers: {
    eq: function (v1, v2) {
      return v1 === v2;
    }
  }, defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)





app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})