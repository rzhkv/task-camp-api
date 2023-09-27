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
import initSpaceModel from '../app/Models/space.model.js';
import initProjectModel from '../app/Models/project.model.js';
import initTaskModel from '../app/Models/task.model.js';

export const UserModel = initUserModel(sequelize, DataTypes);
export const SpaceModel = initSpaceModel(sequelize, DataTypes);
export const ProjectModel = initProjectModel(sequelize, DataTypes);
export const TaskModel = initTaskModel(sequelize, DataTypes);

UserModel.belongsToMany(SpaceModel, { through: 'user_space' });
SpaceModel.belongsToMany(UserModel, { through: 'user_space' });

UserModel.belongsToMany(ProjectModel, { through: 'user_project' });
ProjectModel.belongsToMany(UserModel, { through: 'user_project' });

SpaceModel.hasMany(ProjectModel);
ProjectModel.belongsTo(SpaceModel);

ProjectModel.hasMany(TaskModel);
TaskModel.belongsTo(ProjectModel);

UserModel.hasMany(TaskModel);
TaskModel.belongsTo(UserModel);

export { connectToDatabase, sequelize, Sequelize, DataTypes };
