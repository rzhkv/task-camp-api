import jwt from 'jsonwebtoken';
import app from '../../config/app.config.js';
import { UserModel } from '../../config/database.config.js';

export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(500).json({
        status: 'error',
        message: 'Авторизация не выполнена',
      });
    }

    const token = authHeader.split(' ')[1];

    const verifed = jwt.verify(token, app.secretPass);

    const user = await UserModel.findOne({
      where: { id: verifed.id },
    });

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
