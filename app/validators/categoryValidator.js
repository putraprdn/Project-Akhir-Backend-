const { body } = require("express-validator");

const createRules = [
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name cannot be empty")
		.isAlpha("en-IN", { ignore: "s" })
		.withMessage("Name can only contain alphabets")
		.escape(),
	body("description")
		.trim()
		.notEmpty()
		.withMessage("Description cannot be empty"),
];

const updateRules = [
	body("name")
		.trim()
		.isAlpha("en-IN", { ignore: ["s", "", " "] })
		.withMessage("Name can only contain alphabets")
		.escape()
		.optional({ nullable: true }),
	body("description").trim().optional({ nullable: true }),
];

module.exports = { createRules, updateRules };
