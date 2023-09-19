import { UserModel } from '../../config/database.config.js';
import { generatePassword } from '../utils/GeneratePassword.js';

export const createUserController = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    const currentUser = await UserModel.findOne({
      where: { email: email },
    });

    if (currentUser) return res.json({ status: 'fail', message: 'Пользователь с таким email уже существует' });

    const user = await UserModel.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });

    res.status(201).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User with that ID not found',
      });
    }

    res.status(201).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const resetPasswordUserController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User with that email not found',
      });
    }

    let newGeneratedPassword = generatePassword(12);

    user.update({
      password: newGeneratedPassword,
    });

    res.status(200).json({
      message: newGeneratedPassword,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
