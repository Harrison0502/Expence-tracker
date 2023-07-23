// const db = require('../../config/mongoose')
// const Record=require('../record')
// const Category = require('../category')

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

// db.once('open', () => {
//   console.log('mongodb connected!')
//   for (let i = 1; i < 6; i++) {
//     const categories = Category.find().lean()
//     Record.create({ name: `exp-${i}`, date: new Date(), amount: i * 100, categoryId: categories[i - 1]._id })
//       .then((record) => {
//         console.log('Record created:', record);
//       })
//       .catch((err) => {
//         console.error('Error creating record:', err);
//       });
//   }
//   console.log('done')
// })

const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

db.once('open', async () => {
  try {
    console.log('mongodb connected!')

    const categories = await Category.find().lean()

    const recordsData = []
    for (let i = 1; i < 6; i++) {
      recordsData.push({
        name: `exp-${i}`,
        date: new Date(),
        amount: i * 100,
        categoryId: categories[i - 1]._id
      })
    }

    await Record.insertMany(recordsData)
    console.log('record seeder done!')

    process.exit()
  } catch (error) {
    console.log(error)
    process.exit()
  }
})
