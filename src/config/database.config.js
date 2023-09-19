import 'dotenv/config';
import { Sequelize, DataTypes } from 'sequelize';

const MYSQL_URL = process.env.DATABASE_URL;
const sequelize = new Sequelize(MYSQL_URL);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

import initUserModel from '../app/Models/user.model.js';
import initProjectModel from '../app/Models/project.model.js';
import initTaskModel from '../app/Models/task.model.js';

export const UserModel = initUserModel(sequelize, DataTypes);
export const ProjectModel = initProjectModel(sequelize, DataTypes);
export const TaskModel = initTaskModel(sequelize, DataTypes);

UserModel.belongsToMany(ProjectModel, { through: 'UserProjects' });
ProjectModel.belongsToMany(UserModel, { through: 'UserProjects' });

export { connectToDatabase, sequelize, Sequelize, DataTypes };
