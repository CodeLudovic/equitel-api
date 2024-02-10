const {
	getUserController,
} = require("../../controllers/getControllers/User/getUserController");

const getHandlerUser = async (req, res) => {
	if (req.query.email) {
		const user = await getUserController(req.query.email);
		if (user.success) {
			return res.status(200).json({
				message: "Usuario encontrado",
				status: 1,
				data: user,
			});
		} else {
			return res.status(200).json({
				message: "Usuario no encontrado",
				status: 0,
			});
		}
	}
	const users = await getUserController();
	if (users.count > 0) {
		return res.status(200).json(users);
	} else {
		return res.status(200).json({
			message: "Usuario no encontrado",
			status: 0,
		});
	}
};

module.exports = { getHandlerUser };
