const { getProviderExist } = require("../../../utils/getProviderExist");
const { getUserExist } = require("../../../utils/getUserExist");
const { postLog } = require("../../../utils/postLog");

const deleteProveedorController = async (info) => {
	try {
		const { id_proveedor, id_user } = info;
		const userAdmin = await getUserExist(id_user);
		const proveedor = await getProviderExist(id_proveedor);
		if (!proveedor || !userAdmin) {
			return {
				message:
					"Error al eliminar el proveedor, no existe el proveedor o el usuario no es un administrador",
				status: 0,
			};
		}
		const temp_provider = proveedor;
		if (proveedor && userAdmin.dataValues.type === "admin") {
			await proveedor.destroy({
				where: { id: id_proveedor },
			});

			await postLog(
				`Proveedor eliminado por ${userAdmin.dataValues.nombre}`,
				userAdmin.dataValues
			);

			return {
				message:
					"El proveedor ha sido eliminado, proveedor id: " + id_proveedor,
				proveedor: temp_provider.dataValues,
				status: 1,
			};
		} else {
			return {
				message:
					"No se pudo eliminar el proveedor, el usuario no tiene permisos de administracion para eliminarla",
				status: 0,
			};
		}
	} catch (error) {
		return {
			error: error.message,
			message: "Error al eliminar el proveedor, por favor intentelo de nuevo",
			status: 0,
		};
	}
};

module.exports = { deleteProveedorController };
