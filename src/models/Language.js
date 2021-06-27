module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('language', {
    id: DataTypes.INTEGER,
    language: DataTypes.STRING,
  }, { timestamps: false, tableName: 'languages' });

  return Language;
};