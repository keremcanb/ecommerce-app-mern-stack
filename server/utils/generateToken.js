/* eslint-disable implicit-arrow-linebreak */
import jwt from 'jsonwebtoken';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export default generateToken;
