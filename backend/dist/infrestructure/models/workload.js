"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkloadInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../config/connection"));
class WorkloadInstance extends sequelize_1.Model {
}
exports.WorkloadInstance = WorkloadInstance;
const Workload = connection_1.default.define('workload', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userAssignedId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    adminId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descriptionTask: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    dateDue: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    submintedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    statusTask: {
        type: sequelize_1.DataTypes.ENUM('pending', 'in_progress', 'completed'),
        allowNull: false
    },
    priority: {
        type: sequelize_1.DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    tableName: 'workload',
    timestamps: false
});
exports.default = Workload;
