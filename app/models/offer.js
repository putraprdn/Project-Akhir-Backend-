"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class offer extends Model {
		static associate(models) {
			this.belongsTo(models.product, {
				foreignKey: "productId",
			});

			this.belongsTo(models.user, {
				foreignKey: "createdBy",
			});
		}
	}
	offer.init(
		{
			productId: DataTypes.INTEGER,
			createdBy: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
			status: { type: DataTypes.STRING, defaultValue: "PENDING" },
		},
		{
			sequelize,
			modelName: "offer",
			tableName: "offers",
		}
	);
	return offer;
};
