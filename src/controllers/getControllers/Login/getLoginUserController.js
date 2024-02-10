const { User } = require("../../../db");
const { postLog } = require("../../../utils/postLog");
const getLoginUserController = async (email, password) => {
	try {
		const user = await User.findOne({
			where: {
				email: email,
				password: password,
			},
		});

		if (!user) {
			console.log(user);
			return {
				success: false,
				message: "Contraseña o Usuario Incorrectas",
				status: 0,
			};
		}

		const dataUser = {
			nombre: user.dataValues.nombre,
			email: user.dataValues.email,
			type: user.dataValues.type,
			id: user.dataValues.id,
		};

		if (user) {
			postLog("Inicio de sesion", dataUser);
			return {
				success: true,
				message: "Inicio de sesion satisfactorio",
				data: dataUser,
			};
		} else {
			return { success: false, message: "Credenciales inválidas" };
		}
	} catch (error) {
		return {
			message: `Error en la consulta de inicio de sesión, ${error.message}`,
			status: 0,
		};
	}
};

module.exports = { getLoginUserController };
