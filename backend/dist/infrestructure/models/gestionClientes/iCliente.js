"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../config/connection"));
class clienteInstance extends sequelize_1.Model {
}
exports.clienteInstance = clienteInstance;
const cliente = connection_1.default.define('cliente', {
    clienteId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'clienteId'
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false
    },
    empresa: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: true
    },
    ubicacion: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    prioridad: {
        type: sequelize_1.DataTypes.ENUM('Alta', 'Media', 'Baja'),
        allowNull: false,
        defaultValue: 'Media'
    },
    tipo: {
        type: sequelize_1.DataTypes.ENUM('Empresa', 'Individual'),
        allowNull: false,
        defaultValue: 'Individual'
    },
    estadoComercial: {
        type: sequelize_1.DataTypes.ENUM('Negociación', 'Contactado', 'Perdido', 'Sin Contactar'),
        allowNull: false,
        defaultValue: 'Sin Contactar',
        field: 'estadoComercial'
    },
    ultimaActividad: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'ultimaActividad'
    },
    fechaCreacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'fechaCreacion'
    },
    activo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'clientes',
    timestamps: false
});
exports.default = cliente;
