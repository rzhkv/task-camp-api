import { ProjectModel, UserModel, TaskModel } from '../../config/database.config.js';

export const findByIdTaskController = async (req, res) => {
  const { id } = req.params;
  const { user } = req.state;
  try {
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Задача не найдена',
      });
    }

    const taskProjectId = task.projectId;

    const userAccess = await UserModel.findByPk(user.id, {
      include: [
        {
          model: ProjectModel,
          where: {
            id: taskProjectId,
          },
        },
      ],
    });

    if (!userAccess) {
      return res.status(403).json({
        status: 'error',
        message: 'У вас нет доступа к задаче!',
      });
    }

    res.status(201).json({
      status: 'success',
      data: { task },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const updateTaskController = async (req, res) => {
  const { user } = req.state;
  const { id } = req.params;
  const { title, description, deadline } = req.body;
  try {
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Задача не найдена',
      });
    }

    const taskProjectId = task.projectId;

    const userAccess = await UserModel.findByPk(user.id, {
      include: [
        {
          model: ProjectModel,
          where: {
            id: taskProjectId,
          },
        },
      ],
    });

    if (!userAccess) {
      return res.status(403).json({
        status: 'error',
        message: 'У вас нет доступа к задаче!',
      });
    }

    await task.update({
      title: title || task.title,
      description: description || task.description,
      deadline: deadline || task.deadline,
    });

    const updatedTask = await TaskModel.findByPk(task.id);

    res.status(201).json({
      status: 'success',
      message: 'Задача обновлена',
      data: { updatedTask },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const deleteTaskController = async (req, res) => {
  const { id } = req.params;
  const { user } = req.state;
  try {
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Задача не найден',
      });
    }

    const taskProjectId = task.projectId;

    const userAccess = await UserModel.findByPk(user.id, {
      include: [
        {
          model: ProjectModel,
          where: {
            id: taskProjectId,
          },
        },
      ],
    });

    if (!userAccess) {
      return res.status(403).json({
        status: 'error',
        message: 'У вас нет доступа к задаче!',
      });
    }

    await task.destroy();

    res.status(201).json({
      status: 'success',
      message: 'Задача удалена',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const checkTaskController = async (req, res) => {
  const { id } = req.params;
  const { user } = req.state;
  try {
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Задача не найден',
      });
    }

    const taskProjectId = task.projectId;

    const userAccess = await UserModel.findByPk(user.id, {
      include: [
        {
          model: ProjectModel,
          where: {
            id: taskProjectId,
          },
        },
      ],
    });

    if (!userAccess) {
      return res.status(403).json({
        status: 'error',
        message: 'У вас нет доступа к задаче!',
      });
    }

    await task.update({
      checked: !task.checked,
    });

    const updatedTask = await TaskModel.findByPk(task.id);

    res.status(201).json({
      status: 'success',
      message: 'Задача обновлена',
      data: { updatedTask },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const addUserIntoTaskController = async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  try {
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Задача не найдена',
      });
    }

    const user = await UserModel.findByPk(userId);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Пользователь не найдена',
      });
    }

   const updatedTask = await task.setUser(user);

    if (!updatedTask) {
      return res.status(404).json({
        status: 'error',
        message: 'Задача не найдена',
      });
    }

    return res.status(201).json({
      status: 'success',
      data: { updatedTask },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
