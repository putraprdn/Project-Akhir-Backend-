"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class productImage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.product);
		}
	}
	productImage.init(
		{
			productId: DataTypes.INTEGER,
			image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "productImage",
		}
	);
	return productImage;
};
