require('dotenv').config();
const mongoose = require('mongoose');
const cardSchema = require('../api/card/card.model');
const dbURL = process.env.DBURL;


const cards = [
  {
    title: "aqui aburrido",
    description: "blblablalblablalblablablalblablalblablabl",
    dueDate: new Date(),
    position: 1,
    
  },
  {
    title: "aqui jodido",
    description: "bleblelbleblelbleelb",
    dueDate: new Date(),
    position: 2,
  },
  {
    title: "aqui borracho",
    description: "blibliblibliblibli",
    dueDate: new Date(),
    position: 3,
  },
  {
    title: "aqui tumbado",
    description: "bloblobloblobloblo",
    dueDate: new Date(),
    position: 4,
  },
  {
    title: "aqui mamado",
    description: "blublublublu",
    dueDate: new Date(),
    position: 5,
  },
  {
    title: "aqui abatido",
    description: "ratatatatatatataatatata",
    dueDate: new Date(),
    position: 6,
  },
  {
    title: "aqui doblado",
    description: "blupblupblupblublu",
    dueDate: new Date(),
    position: 7,
  }
];

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    cardSchema.collection.drop()
    cardSchema.create(cards)
    .then(() => {
      mongoose.disconnect();   
    })
    .catch(err => console.log(err))
  });