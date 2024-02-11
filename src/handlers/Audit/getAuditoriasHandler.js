const {
	getAuditoriasController,
} = require("../../controllers/getControllers/Auditoria/getAuditoriasController");

const getAuditoriasHandler = async (req, res) => {
	const { page, pagesize } = req.query;

	if (page && pagesize && pagesize > 0) {
		const auditlogs = await getAuditoriasController(page, pagesize);
		if (auditlogs.count > 0) {
			return res.status(200).json(auditlogs);
		}
	} else {
		const auditlogs = await getAuditoriasController(null, null);
		if (auditlogs.count > 0) {
			return res.status(200).json(auditlogs);
		}
	}
	return res
		.status(404)
		.json({ message: "No existen registros de auditorias", status: 0 });
};

module.exports = { getAuditoriasHandler };
