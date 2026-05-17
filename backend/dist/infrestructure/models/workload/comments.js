"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../config/connection"));
class CommentInstance extends sequelize_1.Model {
}
exports.CommentInstance = CommentInstance;
const WorkloadComments = connection_1.default.define('workloadComments', {
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
    submitedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'workloadComments',
    timestamps: false
});
exports.default = WorkloadComments;
