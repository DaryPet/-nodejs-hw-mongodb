import { signUpUser, findUser } from '../services/auth.js';
import createHttpError from 'http-errors';

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
