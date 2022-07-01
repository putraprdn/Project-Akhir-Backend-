const { body } = require("express-validator");

const registerRules = [
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email cannot be empty")
		.isEmail()
		.withMessage("Email is invalid")
		.normalizeEmail(),
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name cannot be empty")
		.isAlpha("en-IN", { ignore: "s" })
		.withMessage("Name can only contain alphabets")
		.escape(),
	body("password")
		.notEmpty()
		.withMessage("Password cannot be empty")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters or more"),
];
const loginRules = [
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email cannot be empty")
		.isEmail()
		.withMessage("Email is invalid")
		.normalizeEmail(),
	body("password").notEmpty().withMessage("Password cannot be empty"),
];
const updateRules = [
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name cannot be empty")
		.isAlpha("en-IN", { ignore: "s" })
		.withMessage("Name can only contain alphabets")
		.escape(),
	body("city").trim().notEmpty().withMessage("City cannot be empty").escape(),
	body("address")
		.trim()
		.notEmpty()
		.withMessage("Address cannot be empty")
		.escape(),
	body("phoneNumber")
		.trim()
		.notEmpty()
		.withMessage("Phone number cannot be empty")
		.isMobilePhone("id-ID")
		.withMessage("Phone number is invalid"),
];
module.exports = { registerRules, loginRules, updateRules };
