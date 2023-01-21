const express = require('express');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');

mongoose.connect('mongodb://localhost:27017/aroundb').catch((res) => {
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

// app.use((req, res, next) => {
//   req.user = {
//     _id: '63c73d40108933d35d083c71',
//   };

//   next();
// });
app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`O aplicativo está escutando na porta ${PORT}`);
});
