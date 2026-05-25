"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentInstance = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../config/connection"));
/* CLASE DEL MODELO CON MÉTODOS ESTÁTICOS */
class CommentInstance extends sequelize_1.Model {
    // =========================================================
    // 1. FUNCIÓN: Mostrar comentarios por usuario específico
    // =========================================================
    static async getByUser(userId) {
        return await this.findAll({
            where: { userComment: userId },
            // Usamos una tupla de strings limpia para evitar que Sequelize se confunda con el ordenamiento
            order: [['submitedAt', 'DESC']]
        });
    }
    // ====================================================================
    // 2. FUNCIÓN: Filtrar comentarios y búsqueda por filtros dinámica
    // ====================================================================
    static async filterComments(filters) {
        const whereClause = {};
        if (filters.userId) {
            whereClause.userComment = filters.userId;
        }
        if (filters.taskId) {
            whereClause.taskComment = filters.taskId;
        }
        // Si mandan un texto, busca palabras clave dentro del texto del comentario
        if (filters.searchQuery) {
            whereClause.commentText = {
                [sequelize_1.Op.like]: `%${filters.searchQuery}%`
            };
        }
        return await this.findAll({
            where: whereClause,
            order: [['submitedAt', 'DESC']] // Alineado con la única 't' de la base de datos
        });
    }
}
exports.CommentInstance = CommentInstance;
/* DEFINICIÓN DEL MODELO UTILIZANDO INIT (RECOMENDADO EN TS) */
CommentInstance.init({
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
    submittedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
        field: 'submitedAt' // <--- TRUCO GANADOR: Mapea la doble 't' del código a la sola 't' de tu MySQL
    }
}, {
    sequelize: connection_1.default,
    modelName: 'workloadComments',
    tableName: 'workloadComments',
    timestamps: false // Desactiva la búsqueda forzada de createdAt / updatedAt
});
exports.default = CommentInstance;
