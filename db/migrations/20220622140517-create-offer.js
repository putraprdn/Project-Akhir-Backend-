"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("offers", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			productId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "products",
					},
					key: "id",
				},
			},
			createdBy: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "users",
					},
					key: "id",
				},
			},
			price: {
				type: Sequelize.INTEGER,
			},
			status: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("offers");
	},
};
