const { AuditLog } = require("../../../db");

const getAuditoriasController = async () => {
	try {
		const { count, rows } = await AuditLog.findAndCountAll();
		if (count > 0) {
			return {
				count: count,
				auditlogs: rows,
				status: 1,
			};
		} else {
			return {
				message: "No existen auditorias registradas",
				status: 0,
			};
		}
	} catch (error) {
		return {
			error: error.message,
			message: "Error al traer las auditorias",
			status: 0,
		};
	}
};

module.exports = { getAuditoriasController };
