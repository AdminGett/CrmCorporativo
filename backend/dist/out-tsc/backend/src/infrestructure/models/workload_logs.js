import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
import Workload from './workloads';
import User from './register';
export class WorkloadLogInstance extends Model {
}
const WorkloadLog = sequelize.define('WorkloadLog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    workload_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Workload,
            key: 'id'
        }
    },
    action: {
        type: DataTypes.ENUM('CREATE', 'UPDATE', 'STATUS_CHANGE', 'DELETE'),
        allowNull: false
    },
    old_value: {
        type: DataTypes.JSON,
        allowNull: true
    },
    new_value: {
        type: DataTypes.JSON,
        allowNull: true
    },
    performed_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'userId' }
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'workload_logs',
    timestamps: false
});
// ========== ASOCIACIONES ==========
WorkloadLog.belongsTo(Workload, { foreignKey: 'workload_id' });
WorkloadLog.belongsTo(User, { as: 'performer', foreignKey: 'performed_by' });
export default WorkloadLog;
//# sourceMappingURL=workload_logs.js.map