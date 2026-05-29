import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/connection";
// Clase que extiende Model para representar la tabla de permisos de usuario en la base de datos
export class PermissionInstance extends Model {
}
// Definimos el modelo de permisos de usuario, mapeando los campos a la base de datos
const permission = sequelize.define('userPermissions', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    allowed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
}, {
    tableName: 'userPermissions',
    timestamps: false
});
export default permission;
// Definimos el modelo de catálogo de permisos, mapeando los campos a la base de datos
export const permissionsCatalog = sequelize.define('permissionsCatalog', {
    permissionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'permissionId'
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'permissions',
    timestamps: false
});
//Definimos el modelo de permisos por tipo de usuario, mapeando los campos a la base de datos
export const permissionsPerUserType = sequelize.define('permissionsPerUserType', {
    tipoUsuarioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'tipoUsuarioId'
    },
    permissionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'permissionId'
    },
}, {
    tableName: 'tipoUsuarioPermissions',
    timestamps: false
});
// Establecemos las relaciones entre los modelos para facilitar las consultas y asociaciones
permission.belongsTo(permissionsCatalog, { foreignKey: 'permissionId' });
permission.belongsTo(permissionsPerUserType, {
    foreignKey: 'permissionId',
    targetKey: 'permissionId',
});
permissionsPerUserType.belongsTo(permission, { foreignKey: 'permissionId' });
permissionsPerUserType.belongsTo(permissionsCatalog, { foreignKey: 'permissionId' });
//# sourceMappingURL=permission.js.map