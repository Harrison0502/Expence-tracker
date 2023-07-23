const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const User = require('../../models/user')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/new', async (req,res)=>{
  const category = await Category.find().lean()
  res.render('new',{category})
})

router.post('/', (req, res) => {
  const { name, date, amount } = req.body;
  const categoryId = req.body.category; 
  return Record.create({ name, date, amount, categoryId })
    .then(() => res.redirect('/'))  // 新增完成後導回首頁
    .catch(error => console.log(error))
})



module.exports = router