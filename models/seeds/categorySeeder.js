const Category = require('../category') 


const db = require('../../config/mongoose')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const category =
  [{
    'name': '家居物業',
    'image': 'fas fa-home fa-lg'
  },
  {
    'name': '交通出行',
    'image': 'fas fa-shuttle-van fa-lg'
  },
  {
    'name': '休閒娛樂',
    'image': 'fas fa-grin-beam fa-lg'
  },
  {
    'name': '餐飲食品',
    'image': 'fas fa-utensils fa-lg'
  },
  {
    'name': '其他',
    'image': 'fas fa-pen fa-lg'
  }]

// 連線成功
db.once('open', () => {
  Category.create(category) // 可放 array. object
    .then(() => {
      console.log('category seeder done!')
      process.exit()
    })
})