"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class offerhistory extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.product, {
				foreignKey: "productId",
			});

			this.belongsTo(models.user, {
				foreignKey: "createdBy",
			});
		}
	}
	offerhistory.init(
		{
			productId: DataTypes.INTEGER,
			createdBy: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
			status: { type: DataTypes.STRING, defaultValue: "PENDING" },
		},
		{
			sequelize,
			modelName: "offerhistory",
			tableName: "offerhistories",
		}
	);
	return offerhistory;
};
