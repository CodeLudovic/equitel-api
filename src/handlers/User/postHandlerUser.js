const {
	postCreateUserController,
} = require("../../controllers/postControllers/User/postCreateUserController");

const postHandlerUser = async (req, res) => {
	if (req.body.password) {
		const { email, password, nombre, type, id_admin } = req.body;

		if (!email || !password || !nombre) {
			return res.status(400).json({ error: "Lack Of Data" });
		}
		try {
			const newUser = await postCreateUserController(
				email,
				password,
				nombre,
				type,
				id_admin
			);
			if (newUser.user) {
				return res.status(200).json(newUser);
			}
			return res.status(404).json(newUser);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
};

module.exports = { postHandlerUser };
