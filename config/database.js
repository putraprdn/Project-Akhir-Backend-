require("dotenv").config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	},
	production: {
		username: "bewfxrrnuxltnw",
		password: "b9b9a160afd9c58a5808234acd12cac44569cb7a8cac60cddf70548e2de59795",
		database: "d9pmr5vs2g0r1t",
		host: "ec2-44-198-82-71.compute-1.amazonaws.com",
		dialect: "postgres",
		dialectOptions: {
			ssl: { rejectUnauthorized: false }
		}
	}
	// production: {
	// 	username: process.env.DB_USERNAME,
	// 	password: process.env.DB_PASSWORD,
	// 	database: process.env.DB_NAME,
	// 	host: process.env.DB_HOST,
	// 	dialect: process.env.DB_DIALECT,
	// },
};
