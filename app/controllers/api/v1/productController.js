const model = require("../../../models");
const cloudinary = require("../../../../config/cloudinary");

module.exports = {
	// Show all products
	list: async (req, res) => {
		try {
			const products = await model.product.findAll();

			if (products < 1) throw new Error("data empty");

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Products listed",
				data: products,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},
	// Show a product by id
	findById: async (req, res) => {
		try {
			const product = await model.product.findByPk(req.params.id);

			if (product < 1) throw new Error("data empty");
			return res.status(200).json({
				success: true,
				error: 0,
				message: "Product found",
				data: product,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},
	// Show a product by name
	findByName: async (req, res) => {
		try {
			const product = await model.product.findOne({
				where: {
					name: req.params.name,
				},
			});

			if (product < 1) throw new Error("data empty");

			res.status(200).json({
				success: true,
				error: 0,
				message: "Product found",
				data: product,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},
	// Show a product by category
	findByCategory: async (req, res) => {
		try {
			const product = await model.product.findAll({
				where: {
					categoryId: req.params.categoryId,
				},
			});

			if (product < 1) throw new Error("data empty");

			res.status(200).json({
				success: true,
				error: 0,
				message: "Product found",
				data: product,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},
	// Create a new product
	create: async (req, res) => {
		try {
			const product = await model.product.create({
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				categoryId: req.body.categoryId,
			});

			res.status(200).json({
				success: true,
				error: 0,
				message: "Product created",
				data: product,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},

	// Update a product
	update: async (req, res) => {
		try {
			const { path, filename } = req.file;
			const newFileName = filename.split(".")[0];
			const userId = res.locals.user.id;
			// upload to cloudinary
			const uploadedImg = await cloudinary.uploader.upload(path, {
				public_id: `${userId}_${newFileName}`,
			});
			// update product
			const product = await model.product.update(
				{
					name: req.body.name,
					description: req.body.description,
					price: req.body.price,
					categoryId: req.body.categoryId,
					image: uploadedImg.url,
				},
				{
					where: {
						id: req.params.id,
					}
				}
			);

			res.status(200).json({
				success: true,
				error: 0,
				message: "Product updated",
				data: product,
			});
		}
		catch (error) {
			res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},
	// Delete a product
	destroy: async (req, res) => {
		try {
			const product = await model.product.destroy({
				where: {
					id: req.params.id,
				},
			});

			if (product < 1) throw new Error("data empty");

			res.status(200).json({
				success: true,
				error: 0,
				message: "Product deleted",
				data: product,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},
};
