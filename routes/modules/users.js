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
    res.render('login');
  } catch (error) {
    console.error(error);
  }
})

router.get('/register', async (req, res) => {
  try {
    res.render('register');
  } catch (error) {
    console.error(error);
  }
})

module.exports = router