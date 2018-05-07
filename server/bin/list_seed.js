require('dotenv').config();
const mongoose = require('mongoose');
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
  .connect("mongodb://localhost/iron-trello")
  .then(() => {
    listSchema.collection.drop()
    listSchema.create(list_data)
    .then((item) => {
      console.log("items inserted", `${item}`)
      mongoose.disconnect();   
    })
    .catch(err => console.log(err))
  });