const {
	postCreateProveedorController,
} = require("../../controllers/postControllers/Proveedor/postCreateProveedorController");

const postHandlerProvider = async (req, res) => {
	if (req.body) {
		const { nombre, direccion, telefono, rut, userId } = req.body;

		if (!nombre || !direccion || !telefono || !rut || !userId) {
			return res.status(400).json({ error: "Lack Of Data" });
		}
		try {
			const newProvider = await postCreateProveedorController(
				nombre,
				direccion,
				telefono,
				rut,
				userId
			);
			if (newProvider.status === 0) {
				return res.status(400).json({ error: newProvider.message });
			}
			return res.status(200).json(newProvider);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
};

module.exports = { postHandlerProvider };
