const initProjectModel = function(sequelize, DataTypes) {
  const ProjectModel = sequelize.define(
    'project',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(100),
      },
    },
    {
      timestamps: true,
    }
  );

  return ProjectModel;
}

export default initProjectModel;