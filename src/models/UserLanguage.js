module.exports = (sequelize, _DataTypes) => {
  const UserLanguage = sequelize.define('userLanguage', {}, 
  { timestamps: false, tableName: 'userLanguages' });

  UserLanguage.associate = (models) => {
    models.language.belongsToMany(models.user, { 
      as: 'users',
      through: UserLanguage,
      foreignKey: 'language_id',
      otherKey: 'user_id',
    });
  
    models.user.belongsToMany(models.language, { 
      as: 'languages',
      through: UserLanguage,
      foreignKey: 'user_id',
      otherKey: 'language_id',
    });
  };

  return UserLanguage;
};