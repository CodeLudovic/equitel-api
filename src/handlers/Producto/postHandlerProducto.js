const {
	postCreateProductoController,
} = require("../../controllers/postControllers/Producto/postCreateProductoController");

const postHandlerProducto = async (req, res) => {
	if (req.body) {
		const { nombre, stock, descripcion, modelo, precio, proveedorId, userId } =
			req.body;
		if (
			!nombre ||
			!stock ||
			!descripcion ||
			!modelo ||
			!precio ||
			!proveedorId ||
			!userId
		) {
			return res.status(400).json({ error: "Lack Of Data" });
		}
		try {
			const newProduct = await postCreateProductoController(
				nombre,
				stock,
				descripcion,
				modelo,
				precio,
				proveedorId,
				userId
			);
			let result =
				newProduct.status == 1
					? res.status(200).json(newProduct)
					: res.status(400).json(newProduct);
			return result;
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
};

module.exports = { postHandlerProducto };
