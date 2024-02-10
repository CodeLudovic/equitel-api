const { Producto } = require("../../../db");
const getAllProductosContoller = async () => {
	try {
		const { count, rows } = await Producto.findAndCountAll();
		const cleanInfo = rows.map((producto) => {
			return {
				id: producto.id,
				nombre: producto.nombre,
				stock: producto.stock,
				descripcion: producto.descripcion,
				modelo: producto.modelo,
				precio: producto.precio,
				proveedorId: producto.ProveedorId,
			};
		});
		return { count, rows: cleanInfo };
	} catch (error) {
		return "El error" + error;
	}
};

module.exports = { getAllProductosContoller };
