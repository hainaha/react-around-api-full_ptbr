const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(() => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).json({ message: err.errors.link.message });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
      }
    });
};

// module.exports.deleteCard = (req, res) => {
//   const userId = req.user._id;
//   Card.findByIdAndRemove(req.params.cardId)
//     .orFail()
//     .then((card) => {
//       res.send(card);
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         const ERROR_CODE = 404;
//         res
//           .status(ERROR_CODE)
//           .send({ message: 'Nenhum cartão encontrado com esse id' });
//       } else {
//         const ERROR_CODE = 500;
//         res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
//       }
//     });
// };

module.exports.deleteCard = (req, res) => {
  const userId = req.user._id;
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === userId) {
        Card.deleteOne(card)
          .orFail()
          .then(res.send({ message: 'Cartão excluído com sucesso' }))
          .catch((err) => {
            const ERROR_CODE = 500;
            res
              .status(ERROR_CODE)
              .send({ message: 'Um erro ocorreu no servidor' });
          });
      } else {
        const ERROR_CODE = 403;
        res
          .status(ERROR_CODE)
          .send({ message: 'Usuário não autorizado a excluir cartão' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const ERROR_CODE = 404;
        res
          .status(ERROR_CODE)
          .send({ message: 'Nenhum cartão encontrado com esse id' });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const ERROR_CODE = 404;
        res
          .status(ERROR_CODE)
          .send({ message: 'Nenhum cartão encontrado com esse id' });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
      }
    });
};

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const ERROR_CODE = 404;
        res
          .status(ERROR_CODE)
          .send({ message: 'Nenhum cartão encontrado com esse id' });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
      }
    });
