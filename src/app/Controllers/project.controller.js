import { ProjectModel } from '../../config/database.config';

export const addProjectController = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await ProjectModel.create({
      title: title,
      description: description,
    });

    res.status(200).json({
      status: 'success',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const updateProjectController = async (req, res) => {
  try {
  } catch (error) {}
};

export const addNewUserToProjectController = async (req, res) => {
  try {
  } catch (error) {}
};

export const deleteProjectController = async (req, res) => {
  try {
  } catch (error) {}
};
