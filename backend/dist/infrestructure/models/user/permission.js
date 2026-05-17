"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionsPerUserType = exports.permissionsCatalog = exports.PermissionInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../config/connection"));
// Clase que extiende Model para representar la tabla de permisos de usuario en la base de datos
class PermissionInstance extends sequelize_1.Model {
}
exports.PermissionInstance = PermissionInstance;
// Definimos el modelo de permisos de usuario, mapeando los campos a la base de datos
const permission = connection_1.default.define('userPermissions', {
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    permissionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    allowed: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
}, {
    tableName: 'userPermissions',
    timestamps: false
});
exports.default = permission;
// Definimos el modelo de catálogo de permisos, mapeando los campos a la base de datos
exports.permissionsCatalog = connection_1.default.define('permissionsCatalog', {
    permissionId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'permissionId'
    },
    clave: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'permissions',
    timestamps: false
});
//Definimos el modelo de permisos por tipo de usuario, mapeando los campos a la base de datos
exports.permissionsPerUserType = connection_1.default.define('permissionsPerUserType', {
    tipoUsuarioId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: 'tipoUsuarioId'
    },
    permissionId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: 'permissionId'
    },
}, {
    tableName: 'tipoUsuarioPermissions',
    timestamps: false
});
// Establecemos las relaciones entre los modelos para facilitar las consultas y asociaciones
permission.belongsTo(exports.permissionsCatalog, { foreignKey: 'permissionId' });
permission.belongsTo(exports.permissionsPerUserType, {
    foreignKey: 'permissionId',
    targetKey: 'permissionId',
});
exports.permissionsPerUserType.belongsTo(permission, { foreignKey: 'permissionId' });
exports.permissionsPerUserType.belongsTo(exports.permissionsCatalog, { foreignKey: 'permissionId' });
