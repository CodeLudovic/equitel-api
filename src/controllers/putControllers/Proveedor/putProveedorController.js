const { getProviderExist } = require("../../../utils/getProviderExist");
const { getUserExist } = require("../../../utils/getUserExist");
const { postLog } = require("../../../utils/postLog");

const putProveedorController = async (user) => {
	const { nombre, telefono, direccion, rut, id_admin, id } = user;
	const userAdmin = await getUserExist(id_admin);
	const proveedor = await getProviderExist(id);
	try {
		if (!proveedor) {
			return { message: "El proveedor a modificar no existe", status: 0 };
		}
		if (userAdmin.dataValues.type === "admin" && proveedor) {
			const data = await proveedor.update(
				{ nombre: nombre, telefono: telefono, direccion: direccion, rut: rut },
				{ where: { id: id } }
			);

			await postLog("Proveedor modificado", userAdmin.dataValues);

			if (data[0] === 0) {
				return { message: "Proveedor no modificado", status: 0 };
			}

			return { message: `Proveedor Modificado Id: ${id}`, status: 1 };
		} else {
			return {
				message:
					"El usuario no cuenta con permisos de administrador para modificar el proveedor",
				status: 0,
			};
		}
	} catch (error) {
		return {
			error: error.message,
			message:
				"No se pudo modificar el proveedor, por favor intentelo de nuevo",
			status: 0,
		};
	}
};

module.exports = { putProveedorController };
