module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction(async (t) => {
			try {
				await queryInterface.addColumn(
					"products",
					"createdBy",
					{
						type: Sequelize.INTEGER,
						allowNull: false,
						references: {
							model: {
								tableName: "users",
							},
							key: "id",
						},
					},
					{ transaction: t }
				),
					await queryInterface.addColumn(
						"products",
						"soldTo",
						{
							type: Sequelize.INTEGER,
							references: {
								model: {
									tableName: "users",
								},
								key: "id",
							},
						},
						{ transaction: t }
					),
					await queryInterface.addColumn(
						"products",
						"soldPrice",
						{
							type: Sequelize.INTEGER,
						},
						{ transaction: t }
					),
					await queryInterface.addColumn(
						"products",
						"isSold",
						{
							type: Sequelize.BOOLEAN,
							allowNull: false,
						},
						{ transaction: t }
					),
					await queryInterface.addColumn(
						"products",
						"soldAt",
						{
							type: Sequelize.DATE,
						},
						{ transaction: t }
					),
					await queryInterface.addColumn(
						"products",
						"isAvailable",
						{
							type: Sequelize.BOOLEAN,
							allowNull: false,
						},
						{ transaction: t }
					),
					await queryInterface.removeColumn("products", "image", {
						transaction: t,
					});

				return Promise.resolve();
			} catch (e) {
				return Promise.reject(e);
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction(async (t) => {
			try {
				await queryInterface.removeColumn("products", "createdBy", {
					transaction: t,
				}),
					await queryInterface.removeColumn("products", "soldTo", {
						transaction: t,
					}),
					await queryInterface.removeColumn("products", "soldPrice", {
						transaction: t,
					}),
					await queryInterface.removeColumn("products", "isSold", {
						transaction: t,
					}),
					await queryInterface.removeColumn("products", "soldAt", {
						transaction: t,
					}),
					await queryInterface.removeColumn(
						"products",
						"isAvailable",
						{
							transaction: t,
						}
					),
					await queryInterface.addColumn(
						"products",
						"image",
						{
							type: Sequelize.STRING,
							allowNull: false,
						},
						{
							transaction: t,
						}
					);
				return Promise.resolve();
			} catch (e) {
				return Promise.reject(e);
			}
		});
	},
};
