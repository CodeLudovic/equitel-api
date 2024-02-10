const { DataTypes } = require("sequelize");

const User = (sequelize) => {
	sequelize.define("User", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		type: {
			type: DataTypes.ENUM,
			values: ["admin", "seller"],
			allowNull: true,
			defaultValue: "seller",
		},
		enabled: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: true,
		},
	});
};

module.exports = User;
