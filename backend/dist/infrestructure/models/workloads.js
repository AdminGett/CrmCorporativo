"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkloadInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../config/connection"));
const register_1 = __importDefault(require("./register"));
class WorkloadInstance extends sequelize_1.Model {
}
exports.WorkloadInstance = WorkloadInstance;
const Workload = connection_1.default.define('Workload', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'DONE'),
        defaultValue: 'PENDING',
        allowNull: false
    },
    priority: {
        type: sequelize_1.DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
        defaultValue: 'MEDIUM',
        allowNull: false
    },
    assigned_to: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    due_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    tableName: 'workloads',
    timestamps: false
});
// ========== ASOCIACIONES ==========
Workload.belongsTo(register_1.default, { as: 'assignee', foreignKey: 'assigned_to' });
Workload.belongsTo(register_1.default, { as: 'creator', foreignKey: 'created_by' });
exports.default = Workload;
