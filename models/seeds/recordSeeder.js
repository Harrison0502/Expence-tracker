const Record = require('../record')
const db = require('../../config/mongoose');
const Category = require('../category')
const bcrypt = require("bcryptjs");
const User = require('../user');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


const SEED_USERS = require('./data/seedUser.json')
const SEED_RECORDS = require('./data/seedRecord.json')

db.once('open', async () => {
  try {
    const categories = await Category.find().lean()

    // 建立使用者
    for (const user of SEED_USERS) {
      const { name, email, password } = user;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt)
      const newUser = await User.create({
        name: name,
        email: email,
        password: hash,
      });

      // 建立支出紀錄
      const recordsData = [];
      const userId = newUser._id;
      for (const index of user.recordIndex) {
        const record = SEED_RECORDS[index]
        recordsData.push({
          name: record.name,
          date: new Date(record.date),
          amount: record.amount,
          categoryId: categories.find(category => category.name === record.category)._id,
          userId: userId,
        })
      }
      await Record.insertMany(recordsData);
    }

    console.log('The exp-record seed data done!')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit()
  }
})
