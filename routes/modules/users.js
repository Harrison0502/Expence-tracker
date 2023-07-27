const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const User = require('../../models/user')
const bodyParser = require('body-parser')
const dayjs = require('dayjs')

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/login', async (req, res) => {
  try {
    res.render('login')
  } catch (error) {
    console.error(error)
  }
})

router.get('/register', async (req, res) => {
  try {
    res.render('register')
  } catch (error) {
    console.error(error)
  }
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
    .catch(err => console.log(err))
})
module.exports = router