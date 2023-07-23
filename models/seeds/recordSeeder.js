const db = require('../../config/mongoose')
const Record=require('../record')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 1; i < 6; i++) {
    Record.create({ name: `exp-${i}` , date:new Date() , amount:i*100 })
      .then((record) => {
        console.log('Record created:', record);
      })
      .catch((err) => {
        console.error('Error creating record:', err);
      });
  }
  console.log('done')
})