import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
import User from './register';
export class WorkloadInstance extends Model {
}
const Workload = sequelize.define('Workload', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'DONE'),
        defaultValue: 'PENDING',
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
        defaultValue: 'MEDIUM',
        allowNull: false
    },
    assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'userId'
        }
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'workloads',
    timestamps: false
});
// ========== ASOCIACIONES ==========
Workload.belongsTo(User, { as: 'assignee', foreignKey: 'assigned_to' });
Workload.belongsTo(User, { as: 'creator', foreignKey: 'created_by' });
export default Workload;
//# sourceMappingURL=workloads.js.map