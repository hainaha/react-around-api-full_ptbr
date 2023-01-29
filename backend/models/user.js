const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const regex = /http[s]?:\/\/(www.)?([\w\W]{1,256}\/?){1,9}#?/gi;

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: 'String',
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: 'String',
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: 'String',
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'URL inválida',
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    type: 'String',
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'E-mail inválido',
    },
  },
  password: {
    type: 'String',
    required: true,
    minlength: 6,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('E-mail ou senha incorreto'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('E-mail ou senha incorreto'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
