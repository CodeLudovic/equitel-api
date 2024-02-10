const { Router } = require("express");
const {
	getHandlerAllProductos,
} = require("../handlers/Producto/getHandlerAllProductos");
const {
	deleteHandlerProducto,
} = require("../handlers/Producto/deleteHandlerProducto");
const {
	postHandlerProducto,
} = require("../handlers/Producto/postHandlerProducto");
const {
	putHandlerProducto,
} = require("../handlers/Producto/putHandlerProducto");
const productoRoutes = Router();

productoRoutes.get("/all", getHandlerAllProductos);
productoRoutes.post("/product/create", postHandlerProducto);
productoRoutes.put("/product/edit", putHandlerProducto);
productoRoutes.delete("/product/delete", deleteHandlerProducto);

module.exports = productoRoutes;
