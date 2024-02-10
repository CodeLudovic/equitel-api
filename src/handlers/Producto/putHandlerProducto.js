const {
	putProductoController,
} = require("../../controllers/putControllers/Producto/putProductoController");

const putHandlerProducto = async (req, res) => {
	const {
		id,
		nombre,
		stock,
		descripcion,
		modelo,
		precio,
		enabled,
		id_admin,
		ProveedorId,
	} = req.body;

	if (id) {
		const updatedProducto = await putProductoController({
			id: id,
			nombre: nombre,
			stock: stock,
			descripcion: descripcion,
			modelo: modelo,
			precio: precio,
			ProveedorId: ProveedorId,
			enabled: enabled || true,
			id_admin: id_admin,
		});

		const result =
			updatedProducto.status === 1
				? res.status(200).json(updatedProducto)
				: res.status(400).json(updatedProducto);
		return result;
	} else {
		return res.status(400).json({
			error: "Error al modificar el producto.",
			status: 0,
		});
	}
};

module.exports = { putHandlerProducto };
