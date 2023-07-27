const Category = require('../category') 
const SEED_CATEGORIES = require('./data/seedCategory.json')
const db = require('../../config/mongoose')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 連線成功
db.once('open', () => {
  Category.create(SEED_CATEGORIES) // 可放 array. object
    .then(() => {
      console.log('category seeder done!')
      process.exit()
    })
})