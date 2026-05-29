"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../config/connection"));
const register_1 = __importDefault(require("./register"));
const workloads_1 = __importDefault(require("./workloads"));
class CommentInstance extends sequelize_1.Model {
}
exports.CommentInstance = CommentInstance;
const Comment = connection_1.default.define('Comment', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    workload_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
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
    tableName: 'comments',
    timestamps: false
});
// Asociaciones
Comment.belongsTo(register_1.default, { as: 'author', foreignKey: 'user_id' });
Comment.belongsTo(workloads_1.default, { foreignKey: 'workload_id' });
workloads_1.default.hasMany(Comment, { foreignKey: 'workload_id' });
exports.default = Comment;
