const {
	getAuditoriasController,
} = require("../../controllers/getControllers/Auditoria/getAuditoriasController");

const getAuditoriasHandler = async (req, res) => {
	const auditlogs = await getAuditoriasController();
	if (auditlogs.count > 0) {
		return res.status(200).json({
			count: auditlogs.count,
			auditlogs: auditlogs.auditlogs,
			status: 1,
		});
	}
	return res
		.status(404)
		.json({ message: "No existen registros de auditorias", status: 0 });
};

module.exports = { getAuditoriasHandler };
