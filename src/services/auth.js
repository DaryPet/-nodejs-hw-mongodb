import User from '../db/User.js';
// import bcrypt from 'bcrypt';
import { hashValue } from '../utils/hash.js';

export const findUser = (filter) => User.findOne(filter);

export const signUpUser = async (payload) => {
  const { password } = payload;
  const hashedPassword = await hashValue(password);

  const user = await User.create({ ...payload, password: hashedPassword });
  return user;
};
