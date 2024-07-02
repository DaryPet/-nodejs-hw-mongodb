import { signUpUser, findUser } from '../services/auth.js';
import createHttpError from 'http-errors';
import { compareHash } from '../utils/hash.js';

export const signUpUserController = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (user) {
    throw createHttpError(409, 'Email arleady in use');
  }

  const newUser = await signUpUser(req.body);
  const data = {
    name: newUser.name,
    email: newUser.email,
  };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user! ',
    // data: newUser,
    data,
  });
};

export const signInUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(404, 'Email not found');
  }
  const passwordCompare = await compareHash(password, user.password);
  if (!compareHash) {
    throw createHttpError(401, 'Password invalid!');
  }

  const accessToken = '56778.89';
  const refreshToken = '0098979.977866';

  res.json({
    accessToken,
    refreshToken,
  });
};
