module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('address', {
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    cep: DataTypes.STRING,
  }, { timestamps: false, tableName: 'addresses' });

  Address.associate = (models) => {
    Address.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
  };
  
  Address.removeAttribute('id');

  return Address;
};