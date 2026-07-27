"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../config/connection"));
class comments extends sequelize_1.Model {
    static filterTasks(arg0) {
        throw new Error('Method not implemented.');
    }
    static async getAllByUser(userId) {
        return await this.findAll({
            where: {
                userComment: userId
            },
            order: [['submintedAt', 'DESC']]
        });
    }
    static async filterComments(filters) {
        const whereClause = {};
        if (filters.userId) {
            whereClause.userComment =
                filters.userId;
        }
        if (filters.taskId) {
            whereClause.taskComment =
                filters.taskId;
        }
        if (filters.searchQuery) {
            whereClause.commentText = {
                [sequelize_1.Op.like]: `%${filters.searchQuery}%`
            };
        }
        return await this.findAll({
            where: whereClause,
            order: [['submintedAt', 'DESC']]
        });
    }
}
exports.comments = comments;
comments.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userComment: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    taskComment: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    commentText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    submintedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'submintedAt'
    }
}, {
    sequelize: connection_1.default,
    modelName: 'comments',
    tableName: 'comments',
    timestamps: false
});
exports.default = comments;
