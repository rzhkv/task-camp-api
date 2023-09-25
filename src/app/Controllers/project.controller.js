import { ProjectModel, SpaceModel, UserModel } from '../../config/database.config.js';

export const indexProjectController = async (req, res) => {
  try {
    const projects = await ProjectModel.findAll();
    res.status(201).json({
      status: 'success',
      data: { projects },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const findByIdProjectController = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findByPk(id);
    res.status(201).json({
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

export const createProjectController = async (req, res) => {
  const { title, description, spaceId } = req.body;
  const { user } = req;
  try {
    const space = await SpaceModel.findByPk(spaceId);

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

    await project.setSpaces(space);

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

export const updateProjectController = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const project = await ProjectModel.findByPk(id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Проект не найден',
      });
    }

    await project.update({
      title: title,
      description: description,
    });

    const updatedProject = await ProjectModel.findByPk(project.id);

    res.status(201).json({
      status: 'success',
      data: { updatedProject },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const deleteProjectController = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findByPk(id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Проект не найден',
      });
    }

    await project.destroy();

    res.status(201).json({
      status: 'success',
      message: 'Проект удален',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const addUserIntoProjectController = async (req, res) => {
  const users = req.body['users[]'];
  const { id } = req.params;
  try {
    const project = await ProjectModel.findByPk(id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Проект не найден',
      });
    }

    for (const item of users) {
      const user = await UserModel.findByPk(item);
      if (!user) {
        return res.status(500).json({
          status: 'error',
          message: 'Пользователь не найден'
        })
      }
      await user.setProjects(project);
    }

    res.status(201).json({
      status: 'success',
      message: 'новые пользователи добавлены',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
