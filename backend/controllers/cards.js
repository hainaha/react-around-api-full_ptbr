const Card = require('../models/card');
const ServerError = require('../errors/server-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(() => {
      throw new ServerError('Ocorreu um erro no servidor');
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.errors.link.message);
      } else {
        throw new ServerError('Ocorreu um erro no servidor');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === userId) {
        Card.deleteOne(card)
          .orFail()
          .then(res.send({ message: 'Cartão excluído com sucesso' }))
          .catch((err) => {
            throw new ServerError('Ocorreu um erro no servidor');
          });
      } else {
        throw new ForbiddenError('Usuário não autorizado a excluir cartão');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Nenhum cartão encontrado com esse id');
      } else {
        throw new ServerError('Ocorreu um erro no servidor');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
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
        throw new NotFoundError('Nenhum cartão encontrado com esse id');
      } else {
        throw new ServerError('Ocorreu um erro no servidor');
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
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
        throw new NotFoundError('Nenhum cartão encontrado com esse id');
      } else {
        throw new ServerError('Ocorreu um erro no servidor');
      }
    })
    .catch(next);
};
