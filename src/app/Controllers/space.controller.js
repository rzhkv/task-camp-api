import { ProjectModel, SpaceModel, UserModel } from '../../config/database.config.js';

export const indexSpaceController = async (req, res) => {
  const { user } = req.state;
  try {
    const spaces = await SpaceModel.findAll({
      include: [
        {
          model: UserModel,
          required: false,
          where: {
            id: user.id,
          },
        },
      ],
    });

    if (!spaces) {
      return res.status(404).json({
        status: 'error',
        message: 'Связанные проекты не найдены',
      });
    }

    res.status(201).json({
      status: 'success',
      data: { spaces },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const createSpaceController = async (req, res) => {
  const { user } = req.state;
  try {
    const space = await user.createSpace();

    res.status(500).json({
      status: 'success',
      message: 'Новая доска создана!',
      data: { space },
    });
  } catch (error) {
    res.status(500).json({
      status: '500',
      message: error.message,
    });
  }
};

export const getByIdSpaceController = async (req, res) => {
  const { id } = req.params;
  try {
    const space = await SpaceModel.findByPk(id, {
      include: [
        {
          model: UserModel,
        },
        {
          model: ProjectModel,
        },
      ],
    });

    if (!space) {
      return res.status(404).json({
        status: 'error',
        message: 'Проект не найдены',
      });
    }

    res.status(201).json({
      status: 'success',
      data: { space },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const addUserIntoSpaceController = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
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

    const space = await SpaceModel.findByPk(id);

    if (!space) {
      return res.status(404).json({
        status: 'error',
        message: 'Указанный борд не найдена',
      });
    }

    const userInSpace = await space.hasUser(user.id);

    if (userInSpace) {
      return res.status(500).json({
        status: 'error',
        message: 'Пользователь уже добавлен к доске!',
      });
    }

    await user.setSpaces(space);

    const updatedSpace = await SpaceModel.findByPk(space.id, {
      include: [
        {
          model: UserModel,
        },
        {
          model: ProjectModel,
        },
      ],
    });

    res.status(201).json({
      status: 'success',
      message: 'Пользователь прикреплен к доске',
      data: { updatedSpace },
    });
  } catch (error) {
    res.status(500).json({
      status: '500',
      message: error.message,
    });
  }
};

export const createProjectSpaceController = async (req, res) => {
  const { title, description } = req.body;
  const { user } = req.state;
  const { id } = req.params;
  try {
    const space = await SpaceModel.findByPk(id);

    if (!space) {
      return res.status(500).json({
        status: 'error',
        message: 'Борд не найден',
      });
    }

    const project = await ProjectModel.create({
      title: title,
      description: description,
    });

    await project.setUsers(user);

    await project.setSpace(space);

    res.status(200).json({
      status: 'success',
      data: { project },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};