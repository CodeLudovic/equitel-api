const { Router } = require("express");
const reporteRoutes = Router();
const pdf = require("html-pdf");
const { pdfTemplate } = require("./../documents/index.js");
const path = require("path");

reporteRoutes.post("/crear-pdf", (req, res) => {
	const { dataSales, totalSales } = req.body;
	const filePath = path.join(__dirname, "reporteDiario.pdf");
	pdf.create(pdfTemplate(dataSales, totalSales), {}).toFile(filePath, (err) => {
		if (err) {
			return res.status(500).send("error al generar el reporte");
		}
		return res.sendFile(filePath);
	});
});

reporteRoutes.get("/fetch-pdf", (req, res) => {
	res.sendFile(`${__dirname}/reporteDiario.pdf`);
});

module.exports = reporteRoutes;
