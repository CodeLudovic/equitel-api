const {
	putUserController,
} = require("../../controllers/putControllers/User/putUserController");

const putHandlerUser = async (req, res) => {
	const { email, nombre, password, id, id_admin, type } = req.body;

	if (email) {
		const updatedUser = await putUserController({
			email: email,
			password: password,
			nombre: nombre,
			type: type || "seller",
			id: id,
			id_admin: id_admin,
		});

		const result =
			updatedUser.status === 1
				? res.status(200).json(updatedUser)
				: res.status(400).json(updatedUser);
		return result;
	} else {
		return res.status(400).json({
			error:
				error.message + "No se envio correctamente la informacion al servidor",
		});
	}
};

module.exports = { putHandlerUser };
