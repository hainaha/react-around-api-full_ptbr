const mongoose = require('mongoose');

const regex = /http[s]?:\/\/(www.)?([\w\W]{1,256}\/?){1,9}#?/gi;

const userSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: 'String',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: 'String',
    required: true,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'URL inválida',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
