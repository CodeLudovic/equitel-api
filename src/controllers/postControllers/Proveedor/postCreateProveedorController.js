const { Proveedor } = require("../../../db");
const { getUserExist } = require("../../../utils/getUserExist");
const { postLog } = require("../../../utils/postLog");

const postCreateProveedorController = async (
	nombre,
	direccion,
	telefono,
	rut,
	userId
) => {
	try {
		//const proveedor = await getProviderExist(proveedorId);
		//console.log(proveedor);
		const user = await getUserExist(userId);
		if (user.dataValues.type === "admin") {
			const proveedor = await Proveedor.create({
				nombre: nombre,
				direccion: direccion,
				telefono: telefono,
				rut: rut,
			});

			await postLog(
				`Proveedor Creado por ${user.dataValues.nombre}`,
				user.dataValues
			);

			return {
				message: "El proveedor ha sido creado correctamente",
				proveedor: proveedor,
				status: 1,
			};
		} else
			return {
				message:
					"El proveedor no ha sido creado correctamente, debe tener permisos de administrador",
				status: 0,
			};
	} catch (error) {
		return {
			message: "Error al registrar el proveedor",
			status: 0,
		};
	}
};

module.exports = { postCreateProveedorController };
