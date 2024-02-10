const {
	getProveedorController,
} = require("../../controllers/getControllers/Proveedor/getProveedorController");

const getHandlerProveedores = async (req, res) => {
	const proveedores = await getProveedorController();
	if (proveedores.count > 0) {
		return res.status(200).json(proveedores);
	} else {
		return res.status(400).send("No hay Usuarios disponibles");
	}
};

module.exports = { getHandlerProveedores };
