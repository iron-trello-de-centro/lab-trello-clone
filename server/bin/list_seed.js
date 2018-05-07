require('dotenv').config();
const mongoose = require('mongoose');
const List = '../api/list/list.model.js';
const Card = '../api/card/card.model.js';

const dbURL = process.env.DBURL;

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

mongoose.connect(dbURL)
.then(() => {
  console.log(List, Card);

  List.create(list_data)
    .then(() => {
      console.log('lists inserted');
      mongoose.disconnect();
    })
    .catch(e => console.log(e));
});
