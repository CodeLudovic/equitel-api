const { User } = require("../../../db");
const { getUserExist } = require("../../../utils/getUserExist");
const { postLog } = require("../../../utils/postLog");

const deleteUserController = async (info) => {
	try {
		const { id, id_admin } = info;
		const user = await getUserExist(id);
		const userAdmin = await getUserExist(id_admin);
		const user_temp = user;
		if (!user) {
			return {
				message: "El usuario a eliminar no existe",
				status: 0,
			};
		}
		if (userAdmin.type === "admin" && user) {
			await User.destroy({
				where: { id: id },
			});

			await postLog(
				`Usuario eliminado por ${userAdmin.dataValues.nombre}`,
				userAdmin.dataValues
			);

			return {
				message: "El usuario ha sido eliminado, User ID: " + info.id,
				user: user_temp.dataValues,
				status: 1,
			};
		} else {
			return {
				message:
					"No se pudo eliminar el usuario, el usuario no tiene permisos para eliminar usuarios",
				status: 0,
			};
		}
	} catch (error) {
		return {
			message: "Error al eliminar el usuario",
			status: 0,
		};
	}
};

module.exports = { deleteUserController };
