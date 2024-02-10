const {
	deleteProductoController,
} = require("../../controllers/deleteControllers/Producto/deleteProductoController");

const deleteHandlerProducto = async (req, res) => {
	if (req.body) {
		const { id, id_admin } = req.body;
		if (!id || !id_admin) {
			return res.status(400).json({ error: "Falta Informacion" });
		}
		try {
			const deleteProducto = await deleteProductoController({
				id: id,
				id_admin: id_admin,
			});
			const result =
				deleteProducto.status == 1
					? res.status(200).json(deleteProducto)
					: res.status(400).json(deleteProducto);
			return result;
		} catch (error) {
			return res.status(404).json({
				error: error.message,
				message: "Error al borrar el producto",
				status: 0,
			});
		}
	}
};

module.exports = { deleteHandlerProducto };
