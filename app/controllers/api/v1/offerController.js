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
			let offer = await model.offer.create({
				productId: req.params.id,
				createdBy: res.locals.user.id,
				price: req.body.price,
			});

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

	// find data by Id
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
};
