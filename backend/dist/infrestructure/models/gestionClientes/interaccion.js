"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interaccionInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../config/connection"));
const iCliente_1 = __importDefault(require("./iCliente"));
class interaccionInstance extends sequelize_1.Model {
}
exports.interaccionInstance = interaccionInstance;
const interaccion = connection_1.default.define('interaccion', {
    interaccionId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'interaccionId'
    },
    clienteId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'clienteId',
        references: {
            model: 'clientes',
            key: 'clienteId'
        }
    },
    tipoInteraccion: {
        type: sequelize_1.DataTypes.ENUM('Llamada', 'Reunión', 'Nota', 'Correo'),
        allowNull: false,
        defaultValue: 'Nota',
        field: 'tipoInteraccion'
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    fechaInteraccion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'fechaInteraccion'
    }
}, {
    tableName: 'interacciones',
    timestamps: false
});
/* ===========================
   RELACIONES
=========================== */
iCliente_1.default.hasMany(interaccion, {
    foreignKey: 'clienteId',
    as: 'interacciones'
});
interaccion.belongsTo(iCliente_1.default, {
    foreignKey: 'clienteId',
    as: 'cliente'
});
exports.default = interaccion;
