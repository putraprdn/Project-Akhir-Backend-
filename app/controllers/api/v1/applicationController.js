module.exports = {
	// index API
	handleGetRoot: (req, res) => {
		return res.status(200).json({
			success: true,
			error: 0,
			message: `SecondHand API is up and running! See the documentation here --> ${req.headers.host}/api/documentation`,
			data: null,
		});
	},

	// not found url
	handleNotFound: (req, res) => {
		const errorMsg = `Request dengan alamat ${req.url} tidak ditemukan!`;

		const error = new Error(errorMsg);

		return res.status(404).json({
			success: false,
			error,
			message: error.message,
			data: null,
		});
	},
};
