const { Router } = require("express");
const { postHandlerVenta } = require("../handlers/Venta/postHandlerVenta");
const { getHandlerVenta } = require("../handlers/Venta/getHandlerVenta");
const saleRoutes = Router();

saleRoutes.post("/sale", postHandlerVenta);
saleRoutes.get("/informe-ventas", getHandlerVenta);

module.exports = saleRoutes;
