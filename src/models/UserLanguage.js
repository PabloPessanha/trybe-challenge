module.exports = (sequelize, _DataTypes) => {
  const UserLanguage = sequelize.define('userLanguage', {}, 
  { timestamps: false, tableName: 'userLanguages' });

  UserLanguage.associate = (models) => {
    UserLanguage.belongsToMany(models.user, { 
      as: 'users',
      through: 'userLanguages',
      foreignKey: 'language_id',
      otherKey: 'user_id',
    });
  
    UserLanguage.belongsToMany(models.language, { 
      as: 'languages',
      through: 'userLanguages',
      foreignKey: 'user_id',
      otherKey: 'language_id',
    });
  };

  return UserLanguage;
};