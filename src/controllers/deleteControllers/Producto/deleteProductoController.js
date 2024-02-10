const { Producto } = require("../../../db");
const { getProductExist } = require("../../../utils/getProductExist");
const { getUserExist } = require("../../../utils/getUserExist");
const { postLog } = require("../../../utils/postLog");

const deleteProductoController = async (info) => {
	try {
		const { id, id_admin } = info;
		const user = await getUserExist(id_admin);
		const product = await getProductExist(id);
		if (!product) {
			return {
				message: "El producto no existe",
				status: 0,
			};
		}
		const temp_producto = product;
		if (user.dataValues.type === "admin" && product) {
			await Producto.destroy({
				where: { id: id },
			});

			await postLog(
				`Producto Eliminado ID: ${temp_producto.dataValues.id}, Nombre Producto: ${temp_producto.dataValues.nombre}, ha sido eliminado por el Administrador ${user.dataValues.nombre}`,
				user.dataValues
			);

			return {
				message: `El producto eliminado, producto id: ${temp_producto.dataValues.id}, nombre: ${temp_producto.dataValues.nombre}`,
				producto: product.dataValues,
				status: 1,
			};
		} else {
			return {
				message:
					"No se pudo eliminar el producto, el usuario no tiene permisos para eliminarla",
				status: 0,
			};
		}
	} catch (error) {
		return {
			error: error.message,
			message: "Error al eliminar el producto",
			status: 0,
		};
	}
};

module.exports = { deleteProductoController };
