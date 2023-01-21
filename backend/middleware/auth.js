const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Autorização necessária' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'BF7DC92FA0DCB24F');
  } catch (err) {
    return res.status(401).send({ message: 'Autorização necessária' });
  }

  req.user = payload;

  next();
};
