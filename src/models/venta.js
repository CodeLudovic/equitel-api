const { DataTypes } = require("sequelize");

const Sale = (sequelize) => {
	sequelize.define("Sale", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		identificacion: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		fechaVenta: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		cantidad: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
};
module.exports = Sale;
