import {Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../config/connection';
import { workLoad } from '../../../domain/dto/workload/workload';

// Definición de la interfaz Workload que representa la estructura de una tarea o carga de trabajo en el sistema
export interface Workload {
    id: number;
    userAssignedId: number;
    title: string;
    descriptionTask: string;
    dateDue: string;
    submintedAt: string;
    statusTask: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt?: Date;
    updatedAt?: Date;
}

// extiende de Optional para permitir que ciertos campos sean opcionales al crear una nueva instancia de Workload
export type workloadAttributes = Optional<workLoad,  'id' | 'createdAt' | 'updatedAt'>;

// Clase WorkloadInstance que extiende de Model para representar una instancia de la tabla workload en la base de datos
export class WorkloadInstance extends Model<Workload, workloadAttributes> implements Workload {
    public id!: number;
    public userAssignedId!: number;
    public title!: string;
    public descriptionTask!: string;
    public dateDue!: string;
    public submintedAt!: string;
    public statusTask!: 'pending' | 'in_progress' | 'completed';
    public priority!: 'low' | 'medium' | 'high';
    public createdAt!: Date;
    public updatedAt!: Date;
}

// Definición del modelo Workload utilizando Sequelize, mapeando los campos de la interfaz Workload a las 
// columnas de la tabla workload en la base de datos
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