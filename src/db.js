require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

// Importar los modelos
const UserModel = require("./models/user");
const ProductoModel = require("./models/producto");
const VentaModel = require("./models/venta");
const ProveedorModel = require("./models/proveedor");
const AuditLogModel = require("./models/auditoria");

// Obtener la conexión a la base de datos desde las variables de entorno
const { DB_FULL_CONNECT } = process.env;

// Configurar la conexión a la base de datos
const sequelize = new Sequelize(DB_FULL_CONNECT, {
	logging: false,
	native: false,
	dialectModule: pg,
});

// Pasar la conexión a los modelos para que se asocien a la instancia de Sequelize
UserModel(sequelize);
ProductoModel(sequelize);
VentaModel(sequelize);
ProveedorModel(sequelize);
AuditLogModel(sequelize);

// Obtener los modelos asociados
const { User, Producto, Sale, Proveedor, AuditLog } = sequelize.models;

// Definir relaciones entre los modelos
Producto.belongsTo(Proveedor); // Un producto pertenece a un proveedor
Sale.belongsTo(User); // Una venta es realizada por un usuario
Sale.belongsToMany(Producto, {
	through: "VentaProducto", // Utiliza el modelo VentaProducto como tabla intermedia
});
AuditLog.belongsTo(User); // El registro de auditoría está asociado a un usuario

// Exportar los modelos y la conexión
module.exports = {
	User,
	Producto,
	Sale,
	Proveedor,
	AuditLog,
	conn: sequelize,
};
