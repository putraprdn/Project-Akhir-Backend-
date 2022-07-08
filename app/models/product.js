"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasOne(models.cart);
			this.belongsTo(models.category);
			this.belongsTo(models.user, {
				foreignKey: "createdBy",
				as: "seller",
			});
			this.belongsTo(models.user, { foreignKey: "soldTo", as: "buyer" });
			this.hasMany(models.productImage);
			this.hasOne(models.orderItem);
			this.hasMany(models.offer, {
				foreignKey: "productId",
			});
		}
	}
	product.init(
		{
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			price: DataTypes.INTEGER,
			categoryId: DataTypes.INTEGER,
			createdBy: DataTypes.INTEGER,
			soldTo: DataTypes.INTEGER,
			soldPrice: DataTypes.INTEGER,
			isSold: { type: DataTypes.BOOLEAN, defaultValue: false },
			soldAt: DataTypes.DATE,
			isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
		},
		{
			sequelize,
			modelName: "product",
		}
	);
	return product;
};
