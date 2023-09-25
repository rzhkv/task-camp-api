const initSpaceModel = function(sequelize, DataTypes) {
  const SpaceModel = sequelize.define(
    'spaces',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return SpaceModel;
}

export default initSpaceModel;