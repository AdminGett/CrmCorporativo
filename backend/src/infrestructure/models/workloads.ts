import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
import User from './register';

export interface IWorkload {
  id: string;
  title: string;
  description: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assigned_to: number | null;
  created_by: number;
  due_date: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

export type WorkloadCreationAttributes = Optional<IWorkload, 'id' | 'created_at' | 'updated_at' | 'description' | 'assigned_to' | 'due_date'>;

export class WorkloadInstance extends Model<IWorkload, WorkloadCreationAttributes> implements IWorkload {
  public id!: string;
  public title!: string;
  public description!: string | null;
  public status!: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  public priority!: 'LOW' | 'MEDIUM' | 'HIGH';
  public assigned_to!: number | null;
  public created_by!: number;
  public due_date!: Date | null;
  public created_at!: Date;
  public updated_at!: Date;
}

const Workload = sequelize.define<WorkloadInstance>('Workload', {
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,

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