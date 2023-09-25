import { ProjectModel, UserModel, TaskModel } from '../../config/database.config.js';

export const indexTaskController = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: ProjectModel,
          as: 'projects',
          where: {
            id: id,
          },
        },
      ],
    });

    return res.status(201).json({
      status: 'success',
      data: { tasks },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const findByIdTaskController = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Задача не найдена',
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

export const createTaskController = async (req, res) => {
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

    await task.setProjects(project);

    return res.status(201).json({
      status: 'success',
      message: 'Задача добавлена',
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
  try {
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Задача не найден',
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
  try {
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Задача не найден',
      });
    }

    await task.update({
      checked: !task.checked
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
