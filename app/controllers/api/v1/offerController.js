const { Op } = require("sequelize");
const model = require("../../../models");
const status = ["REJECTED", "ACCEPTED", "PENDING"];

/**
 * !!!! -------------- VALIDATOR BLM AKTIF (UPDATE OFFER)
 *  TUNGGU FINAL BARU UPDATE
 */

module.exports = {
	// show all offers
	list: async (req, res) => {
		try {
			let offers = await model.offer.findAll({
				include: [
					{
						model: model.user,
						attributes: [
							"name",
							"email",
							"city",
							"address",
							"phoneNumber",
							"image",
						],
					},
				],
			});

			offers = offers.map((offer) => ({
				id: offer.id,
				productId: offer.productId,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
				createdBy: offer.user,
			}));

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Offers successfully listed",
				data: offers,
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
			const productId = req.params.id;
			const userId = res.locals.user.id;
			const offerPrice = req.body.price;

			// get offer & check if there is an active (accepted or pending) offer from the same user
			const duplicateOffer = await model.offer.findOne({
				where: {
					productId: productId,
					createdBy: userId,
					status: {
						[Op.or]: [status[2], status[1]], // pending or accepted
					},
				},
			});
			if (duplicateOffer)
				throw new Error(
					"You've already made an offer for this product"
				);

			// get product
			const product = await model.product.findOne({
				where: { id: productId },
			});
			const productPrice = product.price;

			// check is offer < 50% of product price
			if (offerPrice < (productPrice * 50) / 100)
				throw new Error("Minimum offer is 50% of the product price");

			// check is offer > product
			if (offerPrice > productPrice)
				throw new Error(`Offer cannot bigger than product price`);

			let offer = await model.offer.create({
				productId: productId,
				createdBy: userId,
				price: req.body.price,
			});

			if (!offer) throw new Error("Failed to create an offer");

			offer = await model.offer.findOne({
				where: {
					id: offer.id,
				},
				include: [
					{
						model: model.user,
						attributes: [
							"name",
							"email",
							"city",
							"address",
							"phoneNumber",
							"image",
						],
					},
				],
			});

			const getOffer = {
				id: offer.id,
				productId: offer.productId,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
				createdBy: offer.user,
			};

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Offer successfully created",
				data: getOffer,
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

	update: async (req, res) => {
		/**
		 * update offer (only accept 2 requests => [0, 1])
		 * 0 => Reject offer
		 * 1 => Accept offer
		 */
		try {
			const response = status[req.body.status];
			const offerId = req.params.id;
			const offerStatus = req.body.status;
			const userId = res.locals.user.id;

			// get offer id
			let offer = await model.offer.findOne({
				where: {
					id: offerId,
				},
			});

			// if id not found
			if (!offer) throw new Error("Offer doesn't exist");

			// throw error if response neither 0 nor 1
			if (!response) throw new Error("Status is invalid");

			// if an offer is ACCEPTED, auto change status of the rest of the offers from PENDING to REJECTED
			if (offerStatus == 1) {
				await model.offer.update(
					{
						status: status[0],
					},
					{
						where: {
							productId: offer.productId,
							status: status[2], // PENDING
						},
					}
				);
			}

			// update offer status to ACCEPTED
			await model.offer.update(
				{
					status: response,
				},
				{
					where: {
						id: offerId,
					},
				}
			);

			// update product status to sold
			await model.product.update(
				{
					soldTo: userId,
					soldPrice: offer.price,
					isSold: true,
					soldAt: new Date(),
				},
				{
					where: {
						id: offer.productId,
					},
				}
			);

			// get offer
			offer = await model.offer.findOne({
				where: {
					id: offerId,
				},
				include: [
					{
						model: model.user,
						attributes: [
							"name",
							"email",
							"city",
							"address",
							"phoneNumber",
							"image",
						],
					},
				],
			});

			const getOffer = {
				id: offer.id,
				productId: offer.productId,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
				createdBy: offer.user,
			};

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Offer successfully updated",
				data: getOffer,
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

	// find offer by id
	findById: async (req, res) => {
		try {
			const offerId = req.params.id;
			const offer = await model.offer.findOne({
				where: {
					id: offerId,
				},
				include: [
					{
						model: model.user,
						attributes: [
							"name",
							"email",
							"city",
							"address",
							"phoneNumber",
							"image",
						],
					},
				],
			});

			// if id not found
			if (!offer) throw new Error("Offer doesn't exist");

			const getOffer = {
				id: offer.id,
				productId: offer.productId,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
				createdBy: offer.user,
			};

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Offer successfully listed",
				data: getOffer,
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
			const userId = res.locals.user.id;

			if (tokenHeader !== tokenParam) {
				throw new Error("Unauthorized access");
			}

			const offers = await model.offer.findAll({
				where: {
					createdBy: userId,
				},
				include: [
					{
						model: model.user,
						attributes: [
							"name",
							"email",
							"city",
							"address",
							"phoneNumber",
							"image",
						],
					},
				],
			});

			const getAllOffers = offers.map((offer) => ({
				id: offer.id,
				productId: offer.productId,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
				createdBy: offer.user,
			}));

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Offers successfully listed",
				data: getAllOffers,
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
			const productId = req.params.productId;

			const offers = await model.offer.findAll({
				where: {
					productId: productId,
				},
				include: [
					{
						model: model.user,
						attributes: [
							"name",
							"email",
							"city",
							"address",
							"phoneNumber",
							"image",
						],
					},
				],
			});

			const getAllOffers = offers.map((offer) => ({
				id: offer.id,
				productId: offer.productId,
				price: offer.price,
				status: offer.status,
				createdAt: offer.createdAt,
				updatedAt: offer.updatedAt,
				createdBy: offer.user,
			}));

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Offers successfully listed",
				data: getAllOffers,
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

	// delete an offer
	destroy: async (req, res) => {
		try {
			const offerId = req.params.id;

			let offer = await model.offer.findOne({
				where: {
					id: offerId,
				},
			});

			// if id not found
			if (!offer) throw new Error("Offer not found or already deleted");

			offer = await model.offer.destroy({ where: { id: offerId } });

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Offer successfully deleted",
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
