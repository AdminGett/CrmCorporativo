"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentWorkload = void 0;
const sequelize_1 = require("sequelize"); // <-- Importamos 'Op' para los filtros
const connection_1 = __importDefault(require("../../config/connection"));
class ComponentWorkload extends sequelize_1.Model {
    // ==========================================
    // 1. FUNCIÓN: Obtener todas las tareas de un usuario
    // ==========================================
    static async getAllByUser(userId) {
        return await this.findAll({
            where: {
                userAssignedId: userId
            },
            order: [['dateDue', 'ASC']] // Las ordena automáticamente por fecha de vencimiento
        });
    }
    // ==========================================
    // 2. FUNCIÓN: Filtrar tareas con criterios opcionales
    // ==========================================
    static async filterTasks(filters) {
        // Construimos el objeto 'where' de forma dinámica
        const whereClause = {};
        if (filters.userId) {
            whereClause.userAssignedId = filters.userId;
        }
        if (filters.status) {
            whereClause.statusTask = filters.status;
        }
        if (filters.priority) {
            whereClause.priority = filters.priority;
        }
        // Si mandan un texto, busca coincidencias en el título
        if (filters.searchQuery) {
            whereClause.title = {
                [sequelize_1.Op.like]: `%${filters.searchQuery}%` // Si usas PostgreSQL cambia 'Op.like' por 'Op.iLike'
            };
        }
        return await this.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']] // Trae las más recientes primero
        });
    }
}
exports.ComponentWorkload = ComponentWorkload;
// Inicialización del modelo (se mantiene igual)
ComponentWorkload.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userAssignedId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    descriptionTask: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    dateDue: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    submintedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    statusTask: { type: sequelize_1.DataTypes.ENUM('pending', 'in_progress', 'completed'), allowNull: false },
    priority: { type: sequelize_1.DataTypes.ENUM('low', 'medium', 'high'), allowNull: false },
    createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
    updatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW }
}, {
    sequelize: connection_1.default,
    tableName: 'workload',
    timestamps: false
});
exports.default = ComponentWorkload;
