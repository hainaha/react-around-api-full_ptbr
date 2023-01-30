const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getMyUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

usersRouter.get(
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
  getUsers
);

usersRouter.get(
  '/me',
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
  getMyUser
);

usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
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
  getUserById
);

usersRouter.patch(
  '/me',
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
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser
);

usersRouter.patch(
  '/me/avatar',
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
      avatar: Joi.string().required().uri(),
    }),
  }),
  updateUserAvatar
);

module.exports = usersRouter;
