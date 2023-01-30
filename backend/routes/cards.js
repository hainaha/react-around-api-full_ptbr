const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.post(
  '/',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .unknown(),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  }),
  createCard
);

cardsRouter.get(
  '/',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .unknown(),
  }),
  getCards
);

cardsRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .unknown(),
  }),
  deleteCard
);

cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .unknown(),
  }),
  likeCard
);

cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
    headers: Joi.object()
      .keys({
        authorization: Joi.string()
          .regex(
            /^(Bearer )[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
          )
          .required(),
      })
      .unknown(),
  }),
  dislikeCard
);

module.exports = cardsRouter;
