import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
export class WorkloadInstance extends Model {
}
const Workload = sequelize.define('Workload', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING'
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'workloads',
    timestamps: false
});
export default Workload;
//# sourceMappingURL=userwork.js.map