module.exports = (sequelize, DataTypes) => {
  const UserLanguage = sequelize.define('userLanguage', {
    user_id: DataTypes.INTEGER,
    language_id: DataTypes.INTEGER,
  }, { timestamps: false, tableName: 'userLanguages' });

  UserLanguage.associate = (models) => {
    UserLanguage.belongsToMany(models.User, { 
      as: 'users',
      through: UserLanguage,
      foreignKey: 'language_id',
      otherKey: 'user_id',
    });
  
    UserLanguage.belongsToMany(models.Language, { 
      as: 'languages',
      through: UserLanguage,
      foreignKey: 'user_id',
      otherKey: 'language_id',
    });
  };

  return UserLanguage;
};