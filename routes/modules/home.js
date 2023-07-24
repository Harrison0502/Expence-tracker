const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const User = require('../../models/user')



router.get('/',(req,res)=>{
  Record.find().populate('categoryId')
  .lean()
  .then(records=>res.render('index', {records} ))
  .catch(error=>console.error(error))
})

module.exports = router