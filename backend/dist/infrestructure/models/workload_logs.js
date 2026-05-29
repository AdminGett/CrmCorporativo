"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkloadLogInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../config/connection"));
const workloads_1 = __importDefault(require("./workloads"));
const register_1 = __importDefault(require("./register"));
class WorkloadLogInstance extends sequelize_1.Model {
}
exports.WorkloadLogInstance = WorkloadLogInstance;
const WorkloadLog = connection_1.default.define('WorkloadLog', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    workload_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    action: {
        type: sequelize_1.DataTypes.ENUM('CREATE', 'UPDATE', 'STATUS_CHANGE', 'DELETE'),
        allowNull: false
    },
    old_value: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    },
    new_value: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    },
    performed_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    tableName: 'workload_logs',
    timestamps: false
});
// ========== ASOCIACIONES ==========
WorkloadLog.belongsTo(workloads_1.default, { foreignKey: 'workload_id' });
WorkloadLog.belongsTo(register_1.default, { as: 'performer', foreignKey: 'performed_by' });
exports.default = WorkloadLog;
