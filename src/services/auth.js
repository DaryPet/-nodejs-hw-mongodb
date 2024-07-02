import User from '../db/User.js';
import bcrypt from 'bcrypt';

export const findUser = (filter) => User.findOne(filter);

export const signUpUser = async (payload) => {
  const user = await User.create(payload);
  return user;
};
