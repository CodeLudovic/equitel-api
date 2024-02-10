const { DataTypes } = require("sequelize");

const Proveedor = (sequelize) => {
	sequelize.define("Proveedor", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telefono: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rut: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
module.exports = Proveedor;
