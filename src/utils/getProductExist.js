const { Producto } = require("../db");

const getProductExist = async (id) => {
	let product = await Producto.findOne({ where: { id: id } });
	return product;
};

module.exports = { getProductExist };
