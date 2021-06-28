module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('language', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    language: DataTypes.STRING,
  }, { timestamps: false, tableName: 'languages' });

  return Language;
};