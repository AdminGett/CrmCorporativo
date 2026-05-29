import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/connection';


export interface workLoad {
    id: number;
    title: string;
    description: string;
     priority: string; 
    status: string;
    created_by: string;
     assigned_to: number;
    due_date: Date;
}


export type WorkloadCreationAttributes = Optional<workLoad, 'id'>;


export class WorkloadInstance extends Model<workLoad, WorkloadCreationAttributes> implements workLoad {
    public id!: number;
    public title!: string;
    public description!: string;
    public priority!: string;
    public status!: string;
    public created_by!: string;
    public due_date!: Date;
    public assigned_to!: number;
}


const Workload = sequelize.define<WorkloadInstance>('Workload', {
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