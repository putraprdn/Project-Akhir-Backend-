const model = require("../../../models");

module.exports = {
	// add data category
	create: async (req, res) => {
		try {
			const data = await model.category.create({
				name: req.body.name,
				description: req.body.description,
			});

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

			// if data empty
			if (datas < 1) throw new Error("data empty");

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

	// find data by Id
	findById: async (req, res) => {
		try {
			const data = await model.category.findOne({
				where: {
					id: req.params.id,
				},
			});

			// if id not found
			if (!data) throw new Error("data not found");

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
			let data = await model.category.update(
				{
					name: req.body.name,
					description: req.body.description,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);

			// if id not found
			if (data < 1) throw new Error("data not found");

			data = await model.category.findOne({
				where: { id: req.params.id },
			});

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data success updated",
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

			// if id not found
			if (!data) throw new Error("data not found");

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data success deleted",
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
