const { Proveedor } = require("../db");

const getProviderExist = async (id) => {
	let proveedor = await Proveedor.findOne({ where: { id: id } });
	return proveedor;
};

module.exports = { getProviderExist };
