const {
	putProveedorController,
} = require("../../controllers/putControllers/Proveedor/putProveedorController");

const putHandlerProveedor = async (req, res) => {
	const { nombre, telefono, direccion, rut, id, id_admin } = req.body;

	if (nombre) {
		const updatedProveedor = await putProveedorController({
			nombre: nombre,
			telefono: telefono,
			direccion: direccion,
			rut: rut,
			id: id,
			id_admin: id_admin,
		});

		const result =
			updatedProveedor.status === 1
				? res.status(200).json(updatedProveedor)
				: res.status(400).json(updatedProveedor);
		return result;
	} else {
		return res.status(400).json({
			error:
				error.message + "No se envio correctamente la informacion al servidor",
		});
	}
};

module.exports = { putHandlerProveedor };
