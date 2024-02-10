const {
	postCreateVentaController,
} = require("../../controllers/postControllers/Venta/postCreateVentaController");
const { getProductExist } = require("../../utils/getProductExist");
const { getUserExist } = require("../../utils/getUserExist");

const postHandlerVenta = async (req, res) => {
	const { cantidad, id_user, id_product, nombre, identificacion } = req.body;

	if (!cantidad || !id_user || !id_product) {
		return res.status(400).json({ error: "Falta información" });
	}
	const user = await getUserExist(id_user);
	const producto = await getProductExist(id_product);

	if (!user && !producto) {
		return res
			.status(404)
			.json({ message: "Producto o usuario no encontrado", status: 0 });
	}

	const nuevaVenta = await postCreateVentaController(
		producto,
		cantidad,
		user,
		nombre,
		identificacion
	);
	if (nuevaVenta.venta) {
		return res.status(200).json(nuevaVenta);
	}
	return res.status(404).json(nuevaVenta);
};

module.exports = { postHandlerVenta };
