const { Op } = require("sequelize");
const { Sale, Producto, User } = require("../../../db");
const getVentasController = async (fechaInicio, fechaFinal) => {
	try {
		if (fechaInicio && fechaFinal) {
			const { count, rows } = await Sale.findAndCountAll({
				include: [
					{
						model: Producto,
						attributes: ["nombre", "precio"],
					},
					{
						model: User,
						attributes: ["id", "nombre"],
					},
				],
				attributes: ["id", "fechaVenta", "cantidad"],
				where: {
					fechaVenta: {
						[Op.between]: [fechaInicio, fechaFinal],
					},
				},
			});
			const resultadosLimpios = rows.map((venta) => {
				return {
					id: venta.dataValues.id,
					fechaVenta: venta.dataValues.fechaVenta,
					producto: venta.dataValues.Productos[0].nombre,
					precio_unidad: venta.dataValues.Productos[0].precio,
					cantidad: venta.dataValues.cantidad,
					id_usuario: venta.dataValues.User.id,
					usuario: venta.dataValues.User.nombre,
				};
			});

			return {
				count: count,
				ventas: resultadosLimpios,
				status: 1,
			};
		}

		const { count, rows } = await Sale.findAndCountAll({
			include: [
				{
					model: Producto,
					attributes: ["nombre", "precio"],
				},
				{
					model: User,
					attributes: ["id", "nombre"],
				},
			],
			attributes: ["id", "fechaVenta", "cantidad"],
		});
		const resultadosLimpios = rows.map((venta) => {
			return {
				id: venta.dataValues.id,
				fechaVenta: venta.dataValues.fechaVenta,
				producto: venta.dataValues.Productos[0].nombre,
				precio_unidad: venta.dataValues.Productos[0].precio,
				cantidad: venta.dataValues.cantidad,
				id_usuario: venta.dataValues.User.id,
				usuario: venta.dataValues.User.nombre,
			};
		});

		return {
			count: count,
			ventas: resultadosLimpios,
			status: 1,
		};
	} catch (error) {
		return {
			error: error.message,
			message: "Ha ocurrido un error al obtener las ventas",
			status: 0,
		};
	}
};

module.exports = { getVentasController };
