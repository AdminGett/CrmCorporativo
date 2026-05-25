import { Model, DataTypes, Op } from 'sequelize';
import sequelize from '../../config/connection';
/* CLASE DEL MODELO CON MÉTODOS ESTÁTICOS */
export class CommentInstance extends Model {
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
                [Op.like]: `%${filters.searchQuery}%`
            };
        }
        return await this.findAll({
            where: whereClause,
            order: [['submitedAt', 'DESC']] // Alineado con la única 't' de la base de datos
        });
    }
}
/* DEFINICIÓN DEL MODELO UTILIZANDO INIT (RECOMENDADO EN TS) */
CommentInstance.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userComment: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    taskComment: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    commentText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    submittedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: 'submitedAt' // <--- TRUCO GANADOR: Mapea la doble 't' del código a la sola 't' de tu MySQL
    }
}, {
    sequelize,
    modelName: 'workloadComments', // Garantiza que coincida con tus imports
    tableName: 'workloadComments', // Nombre exacto de tu tabla física en MySQL
    timestamps: false // Desactiva la búsqueda forzada de createdAt / updatedAt
});
export default CommentInstance;
//# sourceMappingURL=workloadComments.js.map