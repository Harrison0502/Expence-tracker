const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const User = require('../../models/user')
const bodyParser = require('body-parser')
const dayjs = require('dayjs')

router.use(bodyParser.urlencoded({ extended: true }))

//新增頁面
router.get('/new', async (req,res)=>{
  const category = await Category.find().lean()
  res.render('new',{category})
})

router.post('/', (req, res) => {
  const { name, date, amount } = req.body
  const userId = req.user._id
  const categoryId = req.body.category
  
  return Record.create({ name, userId, date, amount, categoryId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
});


//修改頁面
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const recordId = req.params.id
    const record = await Record.findOne({
      _id: recordId,
      userId: userId,
    }).populate('categoryId').lean();
    if (!record) {
      return res.redirect('/')
    }
    const categories = await Category.find().lean()
    // 進行日期格式化
    record.date = dayjs(record.date).format('YYYY-MM-DD')
    res.render('edit', { record, categories })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
});

//修改資料
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const recordId = req.params.id
    const { name, date, amount, category } = req.body
    await Record.findOneAndUpdate(
      { _id: recordId, userId: userId },
      { name, date, amount, categoryId: category }
    )
    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

//刪除功能
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const recordId = req.params.id
    await Record.findOneAndDelete({ _id: recordId, userId: userId })
    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})


//篩選類別路由
router.get('/', async (req, res) => {
  try {
    const selectedCategory = req.query.category;  // 取得選擇的類別
    const userId = req.user._id
    let records;  // 用於存放支出記錄
    if (selectedCategory && selectedCategory !== 'all') {  // 如果選擇了某個類別
      records = await Record.find({ categoryId: selectedCategory, userId: userId }).populate('categoryId').lean();
    } else {  // 如果選擇了「全部類別」或未選擇類別
      records = await Record.find({ userId: userId }).populate('categoryId').lean();
    }

    records.forEach(record => {
      record.date = dayjs(record.date).format('YYYY-MM-DD')
    });

    const totalAmount = records.reduce((total, record) => total + record.amount, 0);
    const categories = await Category.find().lean();

    res.render('index', { records, totalAmount, categories, selectedCategory });  // 將 selectedCategory 傳入樣板
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router