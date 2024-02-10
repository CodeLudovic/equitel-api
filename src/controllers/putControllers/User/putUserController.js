const { User } = require("../../../db");
const { getUserExist } = require("../../../utils/getUserExist");
const { postLog } = require("../../../utils/postLog");

const putUserController = async (user) => {
	const { email, nombre, password, id, id_admin, type } = user;
	const userExist = await getUserExist(id);
	const user_admin = await getUserExist(id_admin);
	try {
		if (!userExist) {
			return { message: "El usuario a modificar no existe", status: 0 };
		}
		if (user_admin.type === "admin" && userExist) {
			const data = await User.update(
				{ nombre: nombre, password: password, email: email, type: type },
				{ where: { id: id } }
			);

			await postLog(
				`Usuario modificado por ${user_admin.dataValues.nombre}`,
				user_admin.dataValues
			);

			if (data[0] === 0) {
				return { message: "Usuario no modificado", status: 0 };
			}

			return { message: `Usuario Modificado: ${email}`, status: 1 };
		} else {
			return {
				message:
					"El usuario no cuenta con permisos de administrador para modificar el usuario",
				status: 0,
			};
		}
	} catch (error) {
		return {
			error: error.message,
			message: "No se pudo modificar el usuario, por favor intentelo de nuevo",
			status: 0,
		};
	}
};

module.exports = { putUserController };
