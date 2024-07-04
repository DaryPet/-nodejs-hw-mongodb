import User from '../db/User.js';
// import bcrypt from 'bcrypt';
import { hashValue } from '../utils/hash.js';
import { SessionsCollection } from '../db/Session.js';
import { randomBytes } from 'crypto';
// import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/indexSort.js';

export const findUser = (filter) => User.findOne(filter);

export const signUpUser = async (payload) => {
  const { password } = payload;
  const hashedPassword = await hashValue(password);

  const user = await User.create({ ...payload, password: hashedPassword });
  return user;
};

export const findSession = (filter) => SessionsCollection.findOne(filter);

export const createSession = async (userId) => {
  await SessionsCollection.deleteOne({ userId });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAYS);

  return SessionsCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

// export const deleteSession = (filter) => SessionsCollection.deleteOne(filter);

export const deleteSession = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
