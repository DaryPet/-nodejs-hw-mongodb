import { signUpUser } from '../services/auth.js';
// import createHttpError from 'http-errors';

export const signUpUserController = async (req, res) => {
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
