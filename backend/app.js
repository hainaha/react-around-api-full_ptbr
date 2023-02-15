const express = require('express');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
var cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');

mongoose.connect('mongodb://localhost:27017/aroundb').catch((res) => {
  const ERROR_CODE = 500;
  res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
});

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ defaultCharset: 'utf-8' }));
app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    }),
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser
);

app.use(auth);
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ocorreu um erro no servidor' : message,
  });
});

app.listen(PORT, () => {
  console.log(`O aplicativo está escutando na porta ${PORT}`);
});
