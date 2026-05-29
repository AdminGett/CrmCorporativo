"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../config/connection"));
class RefreshTokenInstance extends sequelize_1.Model {
}
exports.RefreshTokenInstance = RefreshTokenInstance;
const RefreshToken = connection_1.default.define('RefreshToken', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    revoked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'refreshTokens',
    timestamps: false
});
exports.default = RefreshToken;
