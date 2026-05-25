"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentWorkload = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../config/connection"));
class componentWorkload extends sequelize_1.Model {
    static async getAllByUser(userId) {
        return await this.findAll({
            where: {
                userAssignedId: userId
            },
            order: [['dateDue', 'ASC']]
        });
    }
    static async filterTasks(filters) {
        const whereClause = {};
        if (filters.userId) {
            whereClause.userAssignedId =
                filters.userId;
        }
        if (filters.status) {
            whereClause.statusTask =
                filters.status;
        }
        if (filters.priority) {
            whereClause.priority =
                filters.priority;
        }
        if (filters.searchQuery) {
            whereClause.title = {
                [sequelize_1.Op.like]: `%${filters.searchQuery}%`
            };
        }
        return await this.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']]
        });
    }
}
exports.componentWorkload = componentWorkload;
componentWorkload.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userAssignedId: {
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
    submittedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
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
    sequelize: connection_1.default,
    modelName: 'componentWorkload',
    tableName: 'workload',
    timestamps: false
});
exports.default = componentWorkload;
