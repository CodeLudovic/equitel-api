const { Producto } = require("../../../db");
const { getProductExist } = require("../../../utils/getProductExist");
const { getProviderExist } = require("../../../utils/getProviderExist");
const { getUserExist } = require("../../../utils/getUserExist");
const { postLog } = require("../../../utils/postLog");

const putProductoController = async (todo) => {
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
	} = todo;
	try {
		const userAdmin = await getUserExist(id_admin);
		const producto = await getProductExist(id);
		const proveedor = await getProviderExist(ProveedorId);

		if (
			!id ||
			!nombre ||
			!stock ||
			!descripcion ||
			!modelo ||
			!precio ||
			!ProveedorId
		) {
			return {
				message: "Falta informacion para editar el producto",
				status: 0,
			};
		}

		if (!producto || !proveedor) {
			return { message: "El producto/proveedor no existen", status: 0 };
		}

		if (userAdmin.dataValues.type === "admin" && producto && proveedor) {
			const data = await Producto.update(
				{
					nombre: nombre,
					stock: stock,
					descripcion: descripcion,
					modelo: modelo,
					precio: precio,
					ProveedorId: ProveedorId,
					enabled: enabled,
				},
				{ where: { id: id } }
			);
			if (data[0] === 0) {
				return { message: "El producto no ha sido editado", status: 0 };
			}

			await postLog(
				`Producto modificado por ${userAdmin.dataValues.nombre}`,
				userAdmin.dataValues
			);

			return { message: `Producto: ${id} Modificado`, status: 1 };
		} else {
			return {
				message:
					"El usuario no cuenta con permisos de administrador para modificar el producto",
				status: 0,
			};
		}
	} catch (error) {
		return {
			error: error.message,
			message: "Error al editar el usuario",
			status: 0,
		};
	}
};

module.exports = { putProductoController };
