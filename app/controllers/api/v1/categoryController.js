const model = require("../../../models");

module.exports = {
	// add data category
	create: async (req, res) => {
		try {
			const data = await model.category.create(req.body);

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data success created",
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

	// show all datas
	list: async (req, res) => {
		try {
			const datas = await model.category.findAll();

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

	// find data by Id
	findById: async (req, res) => {
		try {
			const data = await model.category.findOne({
				where: {
					id: req.params.id,
				},
			});

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data success listed",
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

	// update data
	update: async (req, res) => {
		try {
			const data = await model.category.update(
				{
					name: req.body.name,
					description: req.body.description,
				},
				{
					where: {
						id: req.body.id,
					},
				}
			);

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data success update",
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

	// delete data
	destroy: async (req, res) => {
		try {
			const data = await model.category.destroy({
				where: {
					id: req.params.id,
				},
			});

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data success delete",
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
};
