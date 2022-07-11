const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const model = require("../../../models");

const { genSalt, hash, compareSync } = require("bcrypt");
const cryptPassword = async (password) => {
	const salt = await genSalt(12);
	return hash(password, salt);
};
const cloudinary = require("../../../../config/cloudinary");

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

			let user = await model.user.create({
				name: req.body.name,
				email: req.body.email,
				password: encryptedPassword,
			});

			const getUser = await model.user.findOne({
				where: {
					email: user.email,
				},
			});

			user = {
				id: getUser.id,
				name: getUser.name,
				email: getUser.email,
				city: getUser.city,
				address: getUser.address,
				phoneNumber: getUser.phoneNumber,
				image: getUser.image,
				createdAt: getUser.createdAt,
				updatedAt: getUser.updatedAt,
			};

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Your account has been successfully created",
				data: user,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},

	// user login
	login: async (req, res) => {
		try {
			const errorMessage =
				"You have entered an invalid username or password";

			// check if email registered in database and not using oauth
			const isEmailExist = await model.user.findOne({
				where: {
					email: req.body.email,
					password: {
						[Op.not]: null, // not null
					},
				},
			});

			if (!isEmailExist) throw new Error(errorMessage);

			let user = isEmailExist;

			if (compareSync(req.body.password, user.password)) {
				const token = jwt.sign(
					{
						id: user.id,
						name: user.name,
						email: user.email,
					},
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: "1d" }
				);

				user = {
					id: isEmailExist.id,
					name: isEmailExist.name,
					email: isEmailExist.email,
					city: isEmailExist.city,
					address: isEmailExist.address,
					phoneNumber: isEmailExist.phoneNumber,
					image: isEmailExist.image,
					createdAt: isEmailExist.createdAt,
					updatedAt: isEmailExist.updatedAt,
				};

				return res.status(200).json({
					success: true,
					error: 0,
					message: "Login successful",
					data: user,
					token,
				});
			}
			throw new Error(errorMessage);
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},

	whoami: async (req, res) => {
		try {
			const tokenParam = req.params.token;
			let tokenHeader = JSON.stringify(req.headers.authorization);
			tokenHeader = tokenHeader.replaceAll('"', "");
			const email = res.locals.user.email;
			console.log(`tokenParam:\n${tokenParam}`);
			console.log(`tokenHeader:\n${tokenHeader}`);
			if (tokenHeader !== tokenParam) {
				throw new Error("Unauthorized access");
			}

			const getUser = await model.user.findOne({
				where: {
					email: email,
				},
			});

			const user = {
				id: getUser.id,
				name: getUser.name,
				email: getUser.email,
				city: getUser.city,
				address: getUser.address,
				phoneNumber: getUser.phoneNumber,
				image: getUser.image,
				createdAt: getUser.createdAt,
				updatedAt: getUser.updatedAt,
			};

			return res.status(200).json({
				success: true,
				error: 0,
				message: "User logged in",
				data: user,
				tokenHeader,
			});

			throw new Error(errorMessage);
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},

	// update user info
	update: async (req, res) => {
		try {
			const tokenParam = req.params.token;
			const { path, filename } = req.file;
			const { name, city, address, phoneNumber } = req.body;
			const newFileName = filename.split(".")[0];
			let tokenHeader = JSON.stringify(req.headers.authorization);
			tokenHeader = tokenHeader.replaceAll('"', "");
			const userId = res.locals.user.id;

			if (tokenHeader !== tokenParam) {
				throw new Error("Unauthorized access");
			}
			// return console.log(req.body);
			const uploadedImg = await cloudinary.uploader.upload(path, {
				public_id: `${userId}_${newFileName}`,
			});

			if (!uploadedImg) throw new Error("Failed to upload image!");

			const isUserExist = await model.user.findOne({
				where: {
					id: userId,
				},
			});

			// check if id exists in database
			if (!isUserExist) throw new Error("User doesn't exist!");

			await model.user.update(
				{
					image: uploadedImg.secure_url,
					name,
					city,
					address,
					phoneNumber,
				},
				{
					where: {
						id: isUserExist.id,
					},
				}
			);

			// get user so it can be called in return (data:user)
			const getUser = await model.user.findOne({
				where: {
					id: isUserExist.id,
				},
			});

			const user = {
				id: getUser.id,
				name: getUser.name,
				email: getUser.email,
				city: getUser.city,
				address: getUser.address,
				phoneNumber: getUser.phoneNumber,
				image: getUser.image,
				createdAt: getUser.createdAt,
				updatedAt: getUser.updatedAt,
			};

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Update successful",
				data: user,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},

	// delete user
	destroy: async (req, res) => {
		try {
			let tokenHeader = JSON.stringify(req.headers.authorization);
			tokenHeader = tokenHeader.replaceAll('"', "");
			const tokenParam = req.params.token;
			if (tokenHeader !== tokenParam) {
				throw new Error("Unauthorized access");
			}
			// return console.log(res.locals.user.id);
			const isUserExist = await model.user.findOne({
				where: {
					id: res.locals.user.id,
				},
			});

			// check if id exists in database
			if (!isUserExist) throw new Error("User doesn't exist!");

			// check if token's payload is the same user
			// if (res.locals.user.id != req.params.id)
			// 	throw new Error("Unauthorized access");

			await model.user.destroy({
				where: {
					id: isUserExist.id,
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
				error: error,
				message: error.message,
				data: null,
			});
		}
	},
};
