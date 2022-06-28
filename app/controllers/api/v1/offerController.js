const model = require("../../../models");

module.exports = {
	// show all offers
	list: async (req, res) => {
		try {
			const offers = await model.offer.findAll({
				include: ["user"],
			});

			const datas = offers.map((offer) => ({
				id: offer.id,
				productId: offer.productId,
				createdBy: offer.user.email,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
			}));

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data listed",
				data: datas,
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

	// create offer
	create: async (req, res) => {
		try {
			const product = await model.product.findOne({
				where: { id: req.params.id },
			});

			const productPrice = product.price;
			const offerPrice = req.body.price;

			// check is offer < 50% of product price
			if (offerPrice < (productPrice * 50) / 100)
				throw new Error("Minimum offer is 50% of the product price");

			// check is offer > product
			if (offerPrice > productPrice)
				throw new Error(`Offer cannot bigger than Rp.${productPrice}`);

			let offer = await model.offer.create({
				productId: req.params.id,
				createdBy: res.locals.user.id,
				price: req.body.price,
			});

			if (!offer) throw new Error("Failed to create data");

			offer = await model.offer.findOne({
				where: {
					id: offer.id,
				},
				include: ["user"],
			});

			const data = {
				id: offer.id,
				productId: offer.productId,
				createdBy: offer.user.email,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
			};

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data created",
				data: data,
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

	/**
	 * update offer (only accept 2 requests => [0, 1])
	 * 0 => Reject offer
	 * 1 => Accept offer
	 */
	update: async (req, res) => {
		try {
			const status = ["REJECTED", "ACCEPTED"];

			const response = status[req.body.status];

			let offer = await model.offer.findOne({
				where: {
					id: req.params.id,
				},
				include: ["user"],
			});

			// if id not found
			if (!offer) throw new Error("data not found");

			// throw error if response neither 0 nor 1
			if (!response) throw new Error("Invalid input!");

			// if an offer is ACCEPTED, auto change status of the rest offers to REJECTED
			if (req.body.status == 1) {
				await model.offer.update(
					{
						status: status[0],
					},
					{
						where: {
							productId: offer.productId,
							status: "PENDING",
						},
					}
				);
			}

			await model.offer.update(
				{
					status: response,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			offer = await model.offer.findOne({
				where: {
					id: req.params.id,
				},
				include: ["user"],
			});

			const data = {
				id: offer.id,
				productId: offer.productId,
				createdBy: offer.user.email,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
			};

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data updated",
				data,
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

	// find data by id
	findById: async (req, res) => {
		try {
			const offer = await model.offer.findOne({
				where: {
					id: req.params.id,
				},
				include: ["user"],
			});

			// if id not found
			if (!offer) throw new Error("data not found");

			const data = {
				id: offer.id,
				productId: offer.productId,
				createdBy: offer.user.email,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
			};

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data success listed",
				data,
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

	// find data by user token
	findByUser: async (req, res) => {
		try {
			let tokenHeader = JSON.stringify(req.headers.authorization);
			tokenHeader = tokenHeader.replaceAll('"', "");
			const tokenParam = req.params.token;
			if (tokenHeader !== tokenParam) {
				throw new Error("Unauthorized access");
			}

			const offers = await model.offer.findAll({
				where: {
					createdBy: res.locals.user.id,
				},
				include: ["user"],
			});

			// if id not found
			// if (!offer) throw new Error("data not found");

			const datas = offers.map((offer) => ({
				id: offer.id,
				productId: offer.productId,
				createdBy: offer.user.email,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
			}));

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data success listed",
				data: datas,
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

	// find data by product id
	findByProduct: async (req, res) => {
		try {
			const offers = await model.offer.findAll({
				where: {
					productId: req.params.productId,
				},
				include: ["user"],
			});

			// if id not found
			// if (!offer) throw new Error("data not found");

			const datas = offers.map((offer) => ({
				id: offer.id,
				productId: offer.productId,
				createdBy: offer.user.email,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
			}));

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data success listed",
				data: datas,
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
