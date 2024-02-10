const {
	getVentasController,
} = require("../../controllers/getControllers/Venta/getVentaController");

const getHandlerVenta = async (req, res) => {
	const { fechaInicio, fechaFinal } = req.query;

	if (fechaInicio && fechaFinal) {
		const ventas = await getVentasController(fechaInicio, fechaFinal);
		if (ventas) {
			return res.status(200).json(ventas);
		} else {
			return res.status(200).json({
				message: "No existen ventas registradas",
				status: 0,
			});
		}
	}

	const ventas = await getVentasController();
	if (ventas) {
		return res.status(200).json(ventas);
	} else {
		return res.status(200).json({
			message: "No existen ventas registradas",
			status: 0,
		});
	}
};

module.exports = { getHandlerVenta };
