import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
import Workload from './workloads';
import User from './register';

export interface IWorkloadLog {
  id: string;
  workload_id: string;
  action: 'CREATE' | 'UPDATE' | 'STATUS_CHANGE' | 'DELETE';
  old_value: any | null;
  new_value: any | null;
  performed_by: string;
  timestamp?: Date;
}

export type WorkloadLogCreationAttributes = Optional<IWorkloadLog, 'id' | 'timestamp' | 'old_value' | 'new_value'>;

export class WorkloadLogInstance extends Model<IWorkloadLog, WorkloadLogCreationAttributes> implements IWorkloadLog {
  public id!: string;
  public workload_id!: string;
  public action!: 'CREATE' | 'UPDATE' | 'STATUS_CHANGE' | 'DELETE';
  public old_value!: any | null;
  public new_value!: any | null;
  public performed_by!: string;
  public timestamp!: Date;
}

const WorkloadLog = sequelize.define<WorkloadLogInstance>('WorkloadLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
workload_id: {
    type: DataTypes.INTEGER,
    allowNull: false
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