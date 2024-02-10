const { Router } = require("express");
const {
	postHandlerProvider,
} = require("../handlers/Proveedor/postHandlerProveedor");
const {
	deleteHandlerProveedor,
} = require("../handlers/Proveedor/deleteHandlerProveedor");
const {
	putHandlerProveedor,
} = require("../handlers/Proveedor/putHandlerProveedor");
const {
	getHandlerProveedores,
} = require("../handlers/Proveedor/getHandlerProveedor");

const proveedorRoutes = Router();

proveedorRoutes.get("/all", getHandlerProveedores);
proveedorRoutes.post("/provider/create", postHandlerProvider);
proveedorRoutes.delete("/provider/delete", deleteHandlerProveedor);
proveedorRoutes.put("/provider/edit", putHandlerProveedor);

module.exports = proveedorRoutes;
