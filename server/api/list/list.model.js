const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required']
    },
    position: {
      type: Number,
      default: 0
    },
    cards: [
      {
        card: {
          type: Schema.Types.ObjectId,
          ref: 'Card'
        }
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('List', listSchema);
