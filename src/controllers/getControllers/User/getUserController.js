const { User } = require("../../../db");

const getUserController = async (email) => {
	try {
		if (email) {
			const user = await User.findOne({ where: { email: email } });

			if (user === null) {
				return { success: false, message: "Usuario no encontrado" };
			}

			const userData = {
				nombre: user.dataValues.nombre,
				email: user.dataValues.email,
				type: user.dataValues.type,
				id: user.dataValues.id,
			};
			if (user.dataValues) {
				return { success: true, message: "Usuario encontrado", data: userData };
			} else {
				return { success: false, message: "Usuario no encontrado" };
			}
		} else {
			const { count, rows } = await User.findAndCountAll({});
			return {
				count: count,
				users: rows,
				status: 1,
			};
		}
	} catch (error) {
		return {
			error: error.message,
			status: 0,
			message: "Error al traer los usuarios",
		};
	}
};

module.exports = { getUserController };
