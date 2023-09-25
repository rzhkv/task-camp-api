import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import app from '../../config/app.config.js';
import { generatePassword } from '../Utils/GeneratePassword.js';

import { UserModel } from '../../config/database.config.js';

export const createUserController = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    const checkUser = await UserModel.findOne({
      where: { email: email },
    });

    if (checkUser) {
      return res.status(500).json({
        status: 'error',
        message: 'Пользователь с таким email уже существует',
      });
    }

    const hashedPassword = await bcrypt.hashSync(password, 8);

    const user = await UserModel.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign({ id: user.id }, app.secretPass);

    return res.status(201).json({
      status: 'success',
      data: { accessToken },
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
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Пользователь не найден',
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(500).json({
        status: 'error',
        message: 'Пароль неверный',
      });
    }

    const accessToken = jwt.sign({ id: user.id }, accessTokenSecret);

    return res.status(201).json({
      status: 'success',
      data: { accessToken },
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
        status: 'error',
        message: 'Пользователь не найден',
      });
    }

    const newGeneratedPassword = generatePassword(12);

    const hashedPassword = await bcrypt.hash(newGeneratedPassword, 8);

    await user.update({
      password: hashedPassword,
    });

    res.status(200).json({
      status: 'success',
      data: { password: newGeneratedPassword },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
