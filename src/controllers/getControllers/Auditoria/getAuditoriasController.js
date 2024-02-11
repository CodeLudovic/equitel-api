const { AuditLog } = require("../../../db");

const getAuditoriasController = async (page, pagesize) => {
	const offset = Number(page) * Number(pagesize);
	try {
		if (page && pagesize && pagesize > 0) {
			const { count, rows } = await AuditLog.findAndCountAll({
				offset: +offset,
				limit: +pagesize,
			});

			return {
				count: count,
				pagina: page,
				auditlogs: rows,
			};
		} else {
			const { count, rows } = await AuditLog.findAndCountAll();
			return {
				count: count,
				auditlogs: rows,
				status: 1,
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
