import { Model, DataTypes, Op } from 'sequelize'; // <-- Importamos 'Op' para los filtros
import sequelize from '../../config/connection';
export class ComponentWorkload extends Model {
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
                [Op.like]: `%${filters.searchQuery}%` // Si usas PostgreSQL cambia 'Op.like' por 'Op.iLike'
            };
        }
        return await this.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']] // Trae las más recientes primero
        });
    }
}
// Inicialización del modelo (se mantiene igual)
ComponentWorkload.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userAssignedId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    descriptionTask: { type: DataTypes.STRING, allowNull: false },
    dateDue: { type: DataTypes.DATE, allowNull: false },
    submintedAt: { type: DataTypes.DATE, allowNull: false },
    statusTask: { type: DataTypes.ENUM('pending', 'in_progress', 'completed'), allowNull: false },
    priority: { type: DataTypes.ENUM('low', 'medium', 'high'), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
    sequelize,
    tableName: 'workload',
    timestamps: false
});
export default ComponentWorkload;
//# sourceMappingURL=componentWorkload.js.map