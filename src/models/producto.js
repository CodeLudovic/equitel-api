const { DataTypes } = require("sequelize");

const Producto = (sequelize) => {
	sequelize.define("Producto", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		modelo: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		precio: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		enabled: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: true,
		},
	});
};

module.exports = Producto;
