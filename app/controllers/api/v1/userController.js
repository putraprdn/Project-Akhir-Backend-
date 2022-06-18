const model = require("../../../models");

const { genSalt, hash, compareSync } = require("bcrypt");
const cryptPassword = async (password) => {
	const salt = await genSalt(12);
	return hash(password, salt);
};

module.exports = {
	// register user
	register: async (req, res) => {
		try {
			// check if email already used
			const isEmailExist = await model.user.findOne({
				where: {
					email: req.body.email,
				},
			});

			if (isEmailExist) throw new Error("Email already registered!");

			const encryptedPassword = await cryptPassword(req.body.password);

			const user = await model.user.create({
				name: req.body.name,
				email: req.body.email,
				password: encryptedPassword,
			});

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Your account has been successfully created",
				data: user,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error.code,
				message: error,
				data: null,
			});
		}
	},

	// user login
	login: async (req, res) => {
		try {
			const errorMessage =
				"You have entered an invalid username or password";

			// check if email registered in database
			const isEmailExist = await model.user.findOne({
				where: {
					email: req.body.email,
				},
			});

			if (!isEmailExist) throw new Error(errorMessage);

			const user = isEmailExist;

			if (compareSync(req.body.password, user.password)) {
				return res.status(200).json({
					success: true,
					error: 0,
					message: "Login successful",
					data: user,
				});
			}
			throw new Error(errorMessage);
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error.code,
				message: error,
				data: null,
			});
		}
	},

	// update user info
	update: async (req, res) => {
		try {
			const isUserExist = await model.user.findOne({
				where: {
					id: req.params.id,
				},
			});

			// check if id exists in database
			if (!isUserExist) throw new Error("User doesn't exist!");

			await model.user.update(
				{
					image: req.body.image,
					name: req.body.name,
					city: req.body.city,
					address: req.body.address,
					phoneNumber: req.body.phoneNumber,
				},
				{
					where: {
						id: isUserExist.id,
					},
				}
			);

			// get user so it can be called in return (data:user)
			const user = await model.user.findOne({
				where: {
					id: isUserExist.id,
				},
			});

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Update successful",
				data: user,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error.code,
				message: error,
				data: null,
			});
		}
	},

	// delete user
	destroy: async (req, res) => {
		try {
			const isUserExist = await model.user.findOne({
				where: {
					id: req.params.id,
				},
			});

			// check if id exist in database
			if (!isUserExist) throw new Error("User doesn't exist!");

			const user = model.user.destroy({
				where: {
					id: req.params.id,
				},
			});

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Delete successful",
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error.code,
				message: error,
				data: null,
			});
		}
	},
};
