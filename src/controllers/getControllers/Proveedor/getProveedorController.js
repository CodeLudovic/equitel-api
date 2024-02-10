const { Proveedor } = require("../../../db");

const getProveedorController = async () => {
	try {
		const { count, rows } = await Proveedor.findAndCountAll({
			order: [["nombre", "ASC"]],
		});
		if (count <= 0) {
			return {
				message: "No hay Proveedores Disponibles",
				status: 0,
			};
		}
		return {
			count: count,
			providers: rows,
			status: 1,
		};
	} catch (error) {
		return {
			message: "Error al traer los Proveedores",
			error: error.message,
			status: 0,
		};
	}
};

module.exports = { getProveedorController };
