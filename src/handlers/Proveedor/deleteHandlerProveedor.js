const {
	deleteProveedorController,
} = require("../../controllers/deleteControllers/Proveedor/deleteProveedorController");

const deleteHandlerProveedor = async (req, res) => {
	if (req.body) {
		const { id_proveedor, id_user } = req.body;
		if (!id_user || !id_proveedor) {
			return res.status(400).json({ error: "Lack Of Data" });
		}
		const deleteProveedor = await deleteProveedorController({
			id_user: id_user,
			id_proveedor: id_proveedor,
		});
		const result =
			deleteProveedor.status == 1
				? res.status(200).json(deleteProveedor)
				: res.status(400).json(deleteProveedor);
		return result;
	}
};

module.exports = { deleteHandlerProveedor };
