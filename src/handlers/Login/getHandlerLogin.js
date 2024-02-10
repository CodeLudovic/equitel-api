const {
	getLoginUserController,
} = require("../../controllers/getControllers/Login/getLoginUserController");

const getHandlerLogin = async (req, res) => {
	const { email, password } = req.query;
	if (email && password) {
		const response = await getLoginUserController(email, password);
		if (response.success) {
			return res.status(200).json(response);
		} else {
			return res.status(400).json(response);
		}
	} else {
		return res.status(400).json({
			error: "Login Incorrecto",
			status: 0,
		});
	}
};

module.exports = { getHandlerLogin };
