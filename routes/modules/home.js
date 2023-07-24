const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const User = require('../../models/user')
const dayjs = require('dayjs')


router.get('/', (req, res) => {
  Record.find()
    .populate('categoryId')
    .lean()
    .then(records => {
      records.forEach(record => {
        record.date = dayjs(record.date).format('YYYY-MM-DD');
      })
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})

module.exports = router