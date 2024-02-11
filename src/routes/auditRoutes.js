const { Router } = require("express");

const {
	getAuditoriasHandler,
} = require("../handlers/Audit/getAuditoriasHandler");

const auditlogsRouter = Router();

auditlogsRouter.get("/", getAuditoriasHandler);

module.exports = auditlogsRouter;
