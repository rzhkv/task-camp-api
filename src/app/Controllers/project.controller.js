import { ProjectModel, TaskModel, UserModel } from '../../config/database.config.js';

export const findByIdProjectController = async (req, res) => {
  const { id } = req.params;
  const { user } = req.state;
  try {
    const project = await ProjectModel.findByPk(id, {
      include: [
        {
          model: TaskModel,
        },
      ],
    });

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Проект не найден!',
      });
    }

    const userAccess = await project.hasUser(user.id);

    if (!userAccess) {
      return res.status(403).json({
        status: 'error',
        message: 'Доступ к проекту запрещен!',
      });
    }

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

    const updatedProject = await ProjectModel.findByPk(project.id, {
      include: [
        {
          model: TaskModel,
        },
      ],
    });

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
        message: 'Проект не найден!',
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
  const { userId } = req.body;
  const { id } = req.params;
  try {
    const project = await ProjectModel.findByPk(id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Проект не найден',
      });
    }

    const user = await UserModel.findByPk(userId);

    if (!user) {
      return res.status(500).json({
        status: 'error',
        message: 'Пользователь не найден',
      });
    }

    await user.setProjects(project);

    res.status(201).json({
      status: 'success',
      message: 'Новый пользователь добавлен!',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const createTaskProjectController = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  try {
    const project = await ProjectModel.findByPk(id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Не удалось найти проект',
      });
    }

    const task = await TaskModel.create({
      title: title,
    });

    if (!task) {
      return res.status(500).json({
        status: 'error',
        message: 'Не удалось создать задачу',
      });
    }

    await task.setProject(project);

    const updatedTask = await TaskModel.findByPk(task.id);

    if (!updatedTask) {
      return res.status(500).json({
        status: 'error',
        message: 'Не удалось прикрепить задачу к проекту!',
      });
    }

    return res.status(201).json({
      status: 'success',
      message: 'Задача добавлена',
      data: { updatedTask },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
