const { AuditLog } = require("../db");

const postLog = async (action, user) => {
	await AuditLog.create({
		accion: action,
		fecha: new Date().toISOString(),
		UserId: user.id,
	});
};

module.exports = { postLog };
