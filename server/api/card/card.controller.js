const _ = require('lodash');
const mongoose = require('mongoose');
const cardModel = require('./card.model');
const listModel = require('../list/list.model');

exports.createCard = function (req, res, next) {
	const newCard = new cardModel({
		title: req.body.title,
		description: req.body.description,
		dueDate: req.body.dueDate,
		list: req.body.list,
		position: req.body.position
	});

	newCard.save()
	.then(card => {
		console.log(card.list)
		listModel.findByIdAndUpdate(card.list, {$push: {cards: card._id}})
			.then(list => {
				console.log(card)
				console.log(list)
				return res.status(200).json(card);
			});
	})
	.catch(e=>console.log(e))
};


exports.editCard = function (req, res, next) {
	const cardId = req.params.id;

	cardModel
		.findByIdAndUpdate(cardId, {
			$set: req.body
		}, function (err, card) {
			if (err) {
				return res.status(400).json({
					message: 'Unable to update card',
					error: err
				});
			}

			res.json({
				message: 'card successfully updated',
				card: card
			});
		});
};

exports.transferCard = function (req, res, next) {
	const cardId = req.params.id;
	const card = req.body.card;
	const sourceList = req.body.from;
	const targetList = req.body.to;

	cardModel
		.findByIdAndUpdate({
			_id: cardId
		}, {
			$set: card
		}, function (err, card) {
			if (err) {
				return res.status(400).json({
					message: 'unable to update card',
					error: err
				});
			}

			return Promise.all([
				listModel.findByIdAndUpdate({
					_id: sourceList
				}, {
					$pull: {
						cards: cardId
					}
				}).exec(),
				listModel.findByIdAndUpdate({
					_id: targetList
				}, {
					$push: {
						cards: cardId
					}
				}).exec()
			]).then(
				(list) => {
					return res.json({
						message: 'card successfully updated',
						list: list
					})
				},
				(err) => {
					return res.status(400).json({
						message: 'unable to update refs',
						error: err
					})
				}
			);

    return Promise.all([
      listModel
        .findByIdAndUpdate({ _id: sourceList }, { $pull: { cards: cardId } })
        .exec(),
      listModel
        .findByIdAndUpdate({ _id: targetList }, { $push: { cards: cardId } })
        .exec()
    ]).then(
      list => {
        return res.json({ message: 'card successfully updated', list: list });
      },
      err => {
        return res
          .status(400)
          .json({ message: 'unable to update refs', error: err });
      }
    );
  });
};

exports.removeCard = function(req, res) {
  cardModel.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.json({ message: 'impossible to remove the card', error: err });
    }

    res.json({ message: 'card removed successfully' });
  });
};
