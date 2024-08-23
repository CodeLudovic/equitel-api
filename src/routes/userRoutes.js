const { Router } = require("express");
const { postHandlerUser } = require("../handlers/User/postHandlerUser");
const { putHandlerUser } = require("../handlers/User/putHandlerUser");
const { getHandlerUser } = require("../handlers/User/getHandlerUser");
const { deleteHandlerUser } = require("../handlers/User/deleteHandlerUser");

const userRoutes = Router();
userRoutes.get("/", getHandlerUser);
userRoutes.post("/create", postHandlerUser);
userRoutes.put("/user/edit", putHandlerUser);
userRoutes.delete("/user/delete", deleteHandlerUser);

module.exports = userRoutes;
