"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		static associate(models) {
			this.hasOne(models.orderDetail);
			this.hasMany(models.offer, {
				foreignKey: "createdBy",
			});
			this.hasMany(models.product, {
				foreignKey: "createdBy",
			});
			this.hasMany(models.product, {
				foreignKey: "soldTo",
			});
		}
	}
	user.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			city: DataTypes.STRING,
			address: DataTypes.STRING,
			phoneNumber: DataTypes.STRING,
			image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "user",
		}
	);
	return user;
};
