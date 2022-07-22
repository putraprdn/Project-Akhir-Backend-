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
		username: "avjuknfunytkue",
		password: "f2bb4a19bcba6bfe3e23868afc72d4abf1f73b16b812da2f090be3fd80fcca9b",
		database: "d4jndsu6bff91n",
		host: "ec2-54-225-234-165.compute-1.amazonaws.com",
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
