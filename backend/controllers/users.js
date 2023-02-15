const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ServerError = require('../errors/server-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.send(user);
    })
    .catch(() => {
      throw new ServerError('Ocorreu um erro no servidor');
    })
    .catch(next);
};

module.exports.getMyUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Nenhum usuário encontrado com esse id');
      } else {
        throw new ServerError('Ocorreu um erro no servidor');
      }
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Nenhum usuário encontrado com esse id');
      } else {
        throw new ServerError('Ocorreu um erro no servidor');
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        if (err.code === 11000) {
          throw new BadRequestError('E-mail já cadastrado');
        } else if (err.name === 'ValidationError') {
          throw new BadRequestError(err.message);
        } else {
          throw new ServerError('Ocorreu um erro no servidor');
        }
      })
      .catch(next)
  );
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Nenhum usuário encontrado com esse id');
      } else {
        throw new ServerError('Ocorreu um erro no servidor');
      }
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Nenhum usuário encontrado com esse id');
      }
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.errors.avatar.message);
      } else {
        throw new ServerError('Ocorreu um erro no servidor');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'BF7DC92FA0DCB24F',
        {
          expiresIn: '7d',
        }
      );
      res.send({ token });
    })
    .catch((err) => {
      throw new UnauthorizedError(err.message);
    })
    .catch(next);
};
