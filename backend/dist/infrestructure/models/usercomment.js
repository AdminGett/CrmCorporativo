"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../config/connection"));
class CommentInstance extends sequelize_1.Model {
}
exports.CommentInstance = CommentInstance;
const CommentModel = connection_1.default.define('Comment', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    workload_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    user_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    content: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    created_at: { type: sequelize_1.DataTypes.DATE, allowNull: true, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, allowNull: true, defaultValue: sequelize_1.DataTypes.NOW }
}, {
    tableName: 'comments',
    timestamps: false
});
exports.default = CommentModel;
