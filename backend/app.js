const express = require('express');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/aroundb').catch(() => {
  const ERROR_CODE = 500;
  res.status(ERROR_CODE).send({ message: 'Um erro ocorreu no servidor' });
});

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ defaultCharset: 'utf-8' }));
app.get('/', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.use((req, res, next) => {
  req.user = {
    _id: '63629286aff71e9fd43affe2',
  };

  next();
});
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`O aplicativo está escutando na porta ${PORT}`);
});
