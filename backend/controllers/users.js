const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.send(user);
    })
    .catch(() => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const ERROR_CODE = 404;
        res
          .status(ERROR_CODE)
          .send({ message: 'Nenhum usuário encontrado com esse id' });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({ message: err.errors.avatar.message });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const ERROR_CODE = 404;
        res
          .status(ERROR_CODE)
          .send({ message: 'Nenhum usuário encontrado com esse id' });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const ERROR_CODE = 404;
        res
          .status(ERROR_CODE)
          .send({ message: 'Nenhum usuário encontrado com esse id' });
      }
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).json({ message: err.errors.avatar.message });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
      }
    });
};
