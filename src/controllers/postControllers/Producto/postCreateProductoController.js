const { Producto } = require("../../../db");
const { getProviderExist } = require("../../../utils/getProviderExist");
const { getUserExist } = require("../../../utils/getUserExist");
const { postLog } = require("../../../utils/postLog");

const postCreateProductoController = async (
	nombre,
	stock,
	description,
	modelo,
	precio,
	proveedorId,
	userId
) => {
	try {
		const proveedor = await getProviderExist(proveedorId);
		const user = await getUserExist(userId);
		if (!proveedor) {
			return {
				message:
					"El producto no ha sido creado correctamente, el proveedor no existe en la base de datos",
				status: 0,
			};
		}

		if (user.dataValues.type === "admin") {
			const producto = await Producto.create({
				nombre: nombre,
				stock: stock,
				descripcion: description,
				modelo: modelo,
				precio: precio,
				ProveedorId: proveedor.id,
			});

			await postLog(
				`Producto Creado por ${user.dataValues.nombre}`,
				user.dataValues
			);

			return {
				message: "El producto ha sido creado correctamente",
				producto: producto,
				status: 1,
			};
		} else
			return {
				message:
					"El producto no ha sido creado correctamente, no tiene permisos para crear productos",
				status: 0,
			};
	} catch (error) {
		return {
			error: error.message,
			message: "Ha sucedido un error al crear el producto, intente nuevamente",
			status: 0,
		};
	}
};

module.exports = { postCreateProductoController };
