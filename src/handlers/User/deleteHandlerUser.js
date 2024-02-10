const {
	deleteUserController,
} = require("../../controllers/deleteControllers/User/deleteUserController");

const deleteHandlerUser = async (req, res) => {
	if (req.body) {
		const { id, id_admin } = req.body;
		if (id === id_admin) {
			return res
				.status(400)
				.json({ error: "No se puede eliminar un usuario asi mismo" });
		}
		if (!id || !id_admin) {
			return res.status(400).json({ error: "Lack Of Data" });
		}
		try {
			const deleteUser = await deleteUserController({
				id: id,
				id_admin: id_admin,
			});
			const result =
				deleteUser.status == 1
					? res.status(200).json(deleteUser)
					: res.status(400).json(deleteUser);
			return result;
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
};

module.exports = { deleteHandlerUser };
