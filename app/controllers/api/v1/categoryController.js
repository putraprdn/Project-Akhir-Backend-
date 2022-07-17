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
			const categoryId = req.params.id;

			const getCategory = await model.category.findOne({
				where: {
					id: categoryId,
				},
			});

			if (!getCategory) throw new Error("Category doesn't exists");

			const name = req.body?.name || getCategory.name;
			const description =
				req.body?.description || getCategory.description;

			let category = await model.category.update(
				{
					name: name,
					description: description,
				},
				{
					where: {
						id: categoryId,
					},
				}
			);

			// if id not found
			if (!category) throw new Error("data not found");

			category = await model.category.findOne({
				where: { id: req.params.id },
			});

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data success updated",
				data: category,
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
			const categoryId = req.params.id;

			const getCategory = await model.category.findOne({
				where: {
					id: categoryId,
				},
			});

			if (!getCategory) throw new Error("Category doesn't exists");

			const category = await model.category.destroy({
				where: {
					id: req.params.id,
				},
			});

			// if id not found
			if (!category) throw new Error("Failed to delete category");

			return res.status(200).json({
				success: true,
				error: 0,
				message: "data success deleted",
				// data: data, 	// gk perlu return data krn sudah dihapus
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
