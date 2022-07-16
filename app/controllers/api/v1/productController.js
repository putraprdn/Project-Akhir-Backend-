const model = require("../../../models");
const cloudinary = require("../../../../config/cloudinary");

module.exports = {
	// Show all products
	list: async (req, res) => {
		try {
			const products = await model.product.findAll(
				{
				include: [
					{
						model: model.user,
						as: "seller",
							attributes: [
								"name",
								"email",
								"city",
								"address",
								"phoneNumber",
								"image",
							],
					},
					{
						model: model.user,
						as: "buyer",
							attributes: [
								"name",
								"email",
								"city",
								"address",
								"phoneNumber",
								"image",
							],
					},
					{ model: model.productImage },
				],
				},
				{
					where: {
						isAvailable: true,
					},
				}
			);

			const datas = products.map((product) => ({
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
				categoryId: product.categoryId,
				createdBy: product.seller.email,
				soldTo: product.buyer?.email || null,
				soldPrice: product.soldPrice,
				isSold: product.isSold,
				soldAt: product.soldAt,
				isAvailable: product.isAvailable,
				createdAt: product.createdAt,
				updatedAt: product.updatedAt,
				seller: product.seller,
				buyer: product?.buyer || {},
				images: product.productImages,
			}));

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Products listed",
				data: datas,
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
			const product = await model.product.findOne(
				{
				where: {
					id: req.params.id,
				},
				include: [
					{
						model: model.user,
						as: "seller",
							attributes: [
								"name",
								"email",
								"city",
								"address",
								"phoneNumber",
								"image",
							],
					},
					{
						model: model.user,
						as: "buyer",
							attributes: [
								"name",
								"email",
								"city",
								"address",
								"phoneNumber",
								"image",
							],
					},
					{ model: model.productImage },
				],
				},
				{
					where: {
						isAvailable: true,
					},
				}
			);

			if (!product) throw new Error("Product not found");

			const data = {
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
				categoryId: product.categoryId,
				createdBy: product.seller.email,
				soldTo: product.buyer?.email || null,
				soldPrice: product.soldPrice,
				isSold: product.isSold,
				soldAt: product.soldAt,
				isAvailable: product.isAvailable,
				createdAt: product.createdAt,
				updatedAt: product.updatedAt,
				seller: product.seller,
				buyer: product?.buyer || {},
				images: product.productImages,
			};

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Product found",
				data: data,
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
			const product = await model.product.findOne(
				{
				where: {
					name: req.params.name,
				},
				include: [
					{
						model: model.user,
						as: "seller",
							attributes: [
								"name",
								"email",
								"city",
								"address",
								"phoneNumber",
								"image",
							],
					},
					{
						model: model.user,
						as: "buyer",
							attributes: [
								"name",
								"email",
								"city",
								"address",
								"phoneNumber",
								"image",
							],
					},
					{ model: model.productImage },
				],
				},
				{
					where: {
						isAvailable: true,
					},
				}
			);

			if (!product) throw new Error("Product not found");

			const data = {
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
				categoryId: product.categoryId,
				createdBy: product.seller.email,
				soldTo: product.buyer?.email || null,
				soldPrice: product.soldPrice,
				isSold: product.isSold,
				soldAt: product.soldAt,
				isAvailable: product.isAvailable,
				createdAt: product.createdAt,
				updatedAt: product.updatedAt,
				seller: product.seller,
				buyer: product?.buyer || {},
				images: product.productImages,
			};

			res.status(200).json({
				success: true,
				error: 0,
				message: "Product found",
				data: data,
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
			const products = await model.product.findAll(
				{
				where: {
					categoryId: req.params.categoryId,
				},
				include: [
					{
						model: model.user,
						as: "seller",
							attributes: [
								"name",
								"email",
								"city",
								"address",
								"phoneNumber",
								"image",
							],
					},
					{
						model: model.user,
						as: "buyer",
							attributes: [
								"name",
								"email",
								"city",
								"address",
								"phoneNumber",
								"image",
							],
					},
					{ model: model.productImage },
				],
				},
				{
					where: {
						isAvailable: true,
					},
				}
			);

			const datas = products.map((product) => ({
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
				categoryId: product.categoryId,
				createdBy: product.seller.email,
				soldTo: product.buyer?.email || null,
				soldPrice: product.soldPrice,
				isSold: product.isSold,
				soldAt: product.soldAt,
				isAvailable: product.isAvailable,
				createdAt: product.createdAt,
				updatedAt: product.updatedAt,
				seller: product.seller,
				buyer: product?.buyer || {},
				images: product.productImages,
			}));

			res.status(200).json({
				success: true,
				error: 0,
				message: "Product found",
				data: datas,
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
			const { name, description, price, categoryId } = req.body;
			const userId = res.locals.user.id;
			const images = req.files;

			const product = await model.product.create({
				name,
				description,
				price,
				categoryId,
				createdBy: userId,
			});

			for await (const image of images) {
				const { path, filename } = image;
				const newFileName = filename.split(".")[0];

				// upload to cloudinary
				const cloudImage = await cloudinary.uploader.upload(path, {
					public_id: `${product.id}_${newFileName}`,
				});

				if (!cloudImage) throw new Error("Failed to upload image!");

				// create productImage
				const newImage = await model.productImage.create({
					productId: product.id,
					image: cloudImage.secure_url,
				});

				if (!newImage) throw new Error("Failed to create image!");
			}

			const getProduct = await model.product.findOne({
				where: {
					id: product.id,
				},
				include: [
					{
						model: model.user,
						as: "seller",
						attributes: [
							"name",
							"email",
							"city",
							"address",
							"phoneNumber",
							"image",
						],
					},
					{
						model: model.user,
						as: "buyer",
						attributes: [
							"name",
							"email",
							"city",
							"address",
							"phoneNumber",
							"image",
						],
					},
					{ model: model.productImage },
				],
			});

			const data = {
				id: getProduct.id,
				name: getProduct.name,
				description: getProduct.description,
				price: getProduct.price,
				categoryId: getProduct.categoryId,
				createdBy: getProduct.seller.email,
				soldTo: getProduct.buyer?.email || null,
				soldPrice: getProduct.soldPrice,
				isSold: getProduct.isSold,
				soldAt: getProduct.soldAt,
				isAvailable: getProduct.isAvailable,
				createdAt: getProduct.createdAt,
				updatedAt: getProduct.updatedAt,
				seller: getProduct.seller,
				buyer: getProduct?.buyer || {},
				images: getProduct.productImages,
			};

			res.status(200).json({
				success: true,
				error: 0,
				message: "Product created",
				data: data,
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
	// Update a product !!!! Masih blm fix
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
					},
				}
			);

			res.status(200).json({
				success: true,
				error: 0,
				message: "Product updated",
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
	// Delete a product
	destroy: async (req, res) => {
		try {
			const userId = res.locals.user.id;
			const productId = req.params.id;

			const productOwnedAndExists = await model.product.findOne({
				where: {
					id: productId,
					createdBy: userId,
					isAvailable: true,
				},
			});

			// check if product exists & belong to the user
			if (!productOwnedAndExists)
				throw new Error(
					"Failed to delete product because it doesn't exists or you have no access"
				);

			const product = await model.product.update(
				{
					isAvailable: false,
				},
				{
					where: {
						id: productId,
					},
				}
			);

			if (!product) throw new Error("Failed to delete product");

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
