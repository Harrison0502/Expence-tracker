const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
const methodOverride = require('method-override')
const flash = require('connect-flash')   
require('./config/mongoose')
const routes=require('./routes')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


app.engine('hbs', exphbs({
  helpers: {
    eq: function (v1, v2) {
      return v1 === v2;
    }
  }, defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})


app.use(routes)





app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})