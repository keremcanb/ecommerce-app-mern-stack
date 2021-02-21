import jwt from 'jsonwebtoken';

const generateToken = (id) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

export default generateToken;
