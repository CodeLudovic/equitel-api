const { Sale, Producto } = require("../../../db");
const { postLog } = require("../../../utils/postLog");

const postCreateVentaController = async (
	producto,
	cantidad,
	user,
	nombre,
	identificacion
) => {
	try {
		const fechaVenta = new Date().toISOString();
		const fechaFormateada = fechaVenta.split("T")[0];
		if (!producto.dataValues) {
			return {
				message: "El producto no existe",
				status: 0,
			};
		}

		if (!user.dataValues) {
			return {
				message: "El usuario no existe",
				status: 0,
			};
		}

		if (producto.dataValues.stock < cantidad) {
			return {
				message: `No hay suficientes productos en stock del producto con id: ${producto.dataValues.id} - ${producto.dataValues.nombre} `,
				status: 0,
			};
		}

		const venta = await Sale.create({
			cantidad: cantidad,
			fechaVenta: fechaFormateada,
			nombre: nombre,
			identificacion: identificacion,
			UserId: user.dataValues.id,
		});

		// Actualizar el stock del producto
		const nuevoStock = producto.stock - cantidad;
		await Producto.update(
			{
				nombre: producto.dataValues.nombre,
				stock: nuevoStock,
				descripcion: producto.dataValues.descripcion,
				modelo: producto.dataValues.modelo,
				precio: producto.dataValues.precio,
			},
			{
				where: { id: producto.dataValues.id },
			}
		);

		await venta.addProducto(producto, { through: { cantidad: cantidad } });

		await postLog(
			`Venta realizada por ${user.nombre}, productos: ${producto.nombre}, cantidad: ${cantidad}`,
			user.dataValues
		);

		return {
			message: "La venta se ha registrado correctamente",
			status: 1,
			venta: venta,
		};
	} catch (error) {
		return {
			error: error.message,
			message: "Ha ocurrido un error al crear la venta",
			status: 0,
		};
	}
};

module.exports = { postCreateVentaController };
