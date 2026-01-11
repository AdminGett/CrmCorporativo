"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../config/connection"));
//  IUserAttributes da todo lo que debe tener la BD
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
// Aqui se "copia" la base de datos de SQL para hacer consultas
const User = connection_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    paterno: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    materno: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tipoUsuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nombreUsuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fechaRegistro: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false
    },
    ultimaActividad: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: null,
        allowNull: true
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    bloqueado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});
exports.default = User;
