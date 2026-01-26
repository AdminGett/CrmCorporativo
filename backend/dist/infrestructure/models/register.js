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
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'userId'
    },
    passwordEncrypt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
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
    fechaNacimiento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    domicilio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nss: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    codigoPostal: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fechaRegistro: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false
    },
    tipoUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    activo: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'userProfile',
    timestamps: false
});
exports.default = User;
