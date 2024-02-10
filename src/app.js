const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes.js");
const loginRoutes = require("./routes/loginRoutes.js");
const productoRoutes = require("./routes/productoRoutes.js");
const proveedorRoutes = require("./routes/proveedorRoutes.js");
const saleRoutes = require("./routes/ventaRoutes.js");
const reporteRoutes = require("./routes/reportesRoutes.js");
require("./db.js");

const server = express();
server.use(express.json());
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

server.use("/users", userRoutes);
server.use("/products", productoRoutes);
server.use("/providers", proveedorRoutes);
server.use("/sales", saleRoutes);
server.use("/auth", loginRoutes);
server.use(reporteRoutes);

// Error catching endware.
server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
