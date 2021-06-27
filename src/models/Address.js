module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('address', {
    user_id: DataTypes.INTEGER,
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    cep: DataTypes.STRING,
  }, { timestamps: false, tableName: 'adresses' });

  Address.associate = (models) => {
    Address.belongsTo(models.Address, { as: 'user', foreignKey: 'user_id' });
  };

  return Address;
};