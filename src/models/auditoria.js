const { DataTypes } = require("sequelize");

const AuditLog = (sequelize) => {
	sequelize.define("AuditLog", {
		accion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fecha: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				isDate: true,
			},
		},
	});
};
module.exports = AuditLog;
