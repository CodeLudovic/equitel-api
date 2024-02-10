const { User } = require("../../../db");
const { getUserExist } = require("../../../utils/getUserExist");
const { postLog } = require("../../../utils/postLog");

const postCreateUserController = async (
	email,
	password,
	nombre,
	type,
	id_admin
) => {
	try {
		const userAdmin = await getUserExist(id_admin);

		if (userAdmin.dataValues.type === "admin") {
			const [user, created] = await User.findOrCreate({
				where: { email: email },
				defaults: {
					password,
					nombre,
					type: type || "seller",
				},
			});

			await postLog(
				`Usuario Creado por ${userAdmin.dataValues.nombre}`,
				userAdmin.dataValues
			);

			const response = created
				? {
						message: "El usuario ha sido creado correctamente",
						user: user,
						status: 1,
				  }
				: { message: "El usuario ya existe porfavor intente con otro email" };

			return response;
		} else {
			return {
				message:
					"El usuario no ha sido creado correctamente, debe tener permisos de administrador",
				status: 0,
			};
		}
	} catch (error) {
		return error;
	}
};

module.exports = { postCreateUserController };
