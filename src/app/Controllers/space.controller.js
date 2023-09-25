import { SpaceModel, UserModel } from '../../config/database.config.js';

export const createSpaceController = async (req, res) => {
  const { user } = req;
  try {
    const space = await user.createSpace();

    res.status(500).json({
      status: 'success',
      message: 'Борд создан',
      data: { space },
    });
  } catch (error) {
    res.status(500).json({
      status: '500',
      message: error.message,
    });
  }
};

export const addUserIntoSpaceController = async (req, res) => {
  const { email, spaceId } = req.body;
  try {
    const user = await UserModel.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Пользователь с указанным email не найден',
      });
    }

    const space = await SpaceModel.findOne({
      where: { id: spaceId },
    });

    if (!space) {
      return res.status(404).json({
        status: 'error',
        message: 'Указанный борд не найдена',
      });
    }

    const userSpace = await user.setSpaces(space);

    res.status(201).json({
      status: 'success',
      message: 'Пользователь прикреплен к доске',
    });
  } catch (error) {
    res.status(500).json({
      status: '500',
      message: error.message,
    });
  }
};
