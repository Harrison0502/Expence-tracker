const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const User = require('../../models/user')
const dayjs = require('dayjs')


router.get('/', async (req, res) => {
  try {
    const selectedCategory = req.query.category

    // 取得所有支出資料，並根據需要篩選類別
    const records = await Record.find(selectedCategory ? { categoryId: selectedCategory } : {})
      .populate('categoryId')
      .lean();

    records.forEach(record => {
      record.date = dayjs(record.date).format('YYYY-MM-DD');
    });

    const totalAmount = records.reduce((total, record) => total + record.amount, 0);
    const categories = await Category.find().lean();

    res.render('index', { records, totalAmount, categories, selectedCategory });
  } catch (error) {
    console.error(error);
  }
});




module.exports = router