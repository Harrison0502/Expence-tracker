const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
require('./config/mongoose')
const routes=require('./routes')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(routes)

app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})