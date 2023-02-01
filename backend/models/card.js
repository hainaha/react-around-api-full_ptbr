const mongoose = require('mongoose');

const regex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: 'String',
    required: true,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'URL inválida',
    },
  },
  owner: {
    type: 'ObjectId',
    required: true,
  },
  likes: [
    {
      type: 'ObjectId',
      default: [],
    },
  ],
  createAt: {
    type: 'Date',
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
