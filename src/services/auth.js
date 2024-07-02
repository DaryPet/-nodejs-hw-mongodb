import User from '../db/User.js';
import bcrypt from 'bcrypt';

export const findUser = (filter) => User.findOne(filter);

export const signUpUser = async (payload) => {
  const { password } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ ...payload, password: hashedPassword });
  return user;
};
