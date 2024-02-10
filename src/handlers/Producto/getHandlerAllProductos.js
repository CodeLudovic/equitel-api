const {
	getAllProductosContoller,
} = require("../../controllers/getControllers/Producto/getAllProductosContoller");

const getHandlerAllProductos = async (req, res) => {
	const { email } = req.query;
	if (email) {
		const productos = await getAllProductosContoller(email);
		if (productos.count > 0) {
			return res.status(200).json(productos);
		} else {
			return res
				.status(404)
				.json({ message: "No se encontraron registros", status: 0 });
		}
	}

	const productos = await getAllProductosContoller();
	if (productos.count > 0) {
		return res.status(200).json(productos);
	} else {
		return res
			.status(404)
			.json({ message: "No se encontraron registros", status: 0 });
	}
};

module.exports = { getHandlerAllProductos };
