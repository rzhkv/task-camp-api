import jwt from 'jsonwebtoken';
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

    const verifed = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await UserModel.findOne({
      where: { id: verifed.id },
    });

    req.state.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
