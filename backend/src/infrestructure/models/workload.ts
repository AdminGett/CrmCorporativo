import {Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';

export interface Workload {
    id: number;
    userAssignedId: number;
    adminId: number;
    title: string;
    descriptionTask: string;
    dateDue: Date;
    submintedAt: Date;
    statusTask: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt?: Date;
    updatedAt?: Date;
}


export class WorkloadInstance extends Model<Workload> implements Workload {
    public id!: number;
    public userAssignedId!: number;
    public adminId!: number;
    public title!: string;
    public descriptionTask!: string;
    public dateDue!: Date;
    public submintedAt!: Date;
    public statusTask!: 'pending' | 'in_progress' | 'completed';
    public priority!: 'low' | 'medium' | 'high';
    public createdAt!: Date;
    public updatedAt!: Date;
}

const Workload = sequelize.define<WorkloadInstance>('workload', {
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
},{
    tableName: 'workload',
    timestamps: false
});

export default Workload;