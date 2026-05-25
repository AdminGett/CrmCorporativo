import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
export class WorkloadInstance extends Model {
}
const Workload = sequelize.define('workload', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userAssignedId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descriptionTask: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateDue: {
        type: DataTypes.DATE,
        allowNull: false
    },
    submintedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    statusTask: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'workload',
    timestamps: false
});
export default Workload;
//# sourceMappingURL=workload.js.map