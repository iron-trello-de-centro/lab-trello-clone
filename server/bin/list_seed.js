const mongoose = require('mongoose');
require('dotenv').config();
const listSchema  = require ('../api/list/list.model');

const list_data = [
  {
    title: 'TO DO',
    position: 0,
    cards: []
  },
  {
    title: 'DOING',
    position: 1,
    cards: []
  },
  {
    title: 'DONE',
    position: 2,
    cards: []
  }
];


mongoose
  .connect(process.env.DBURL)
  .then(() => {
    listSchema.collection.drop()
    listSchema.create(list_data)
    .then((item) => {
      console.log("items inserted", `${item}`)
      mongoose.disconnect();   
    })
    .catch(err => console.log(err))
  });