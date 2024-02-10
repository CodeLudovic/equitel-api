const { Router } = require("express");
const { getHandlerLogin } = require("../handlers/Login/getHandlerLogin");
const loginRoutes = Router();

loginRoutes.get("/login", getHandlerLogin);

module.exports = loginRoutes;
