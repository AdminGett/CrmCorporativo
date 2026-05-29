import {Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../config/connection';

export interface comment {
    id?: number;
    userComment: number;
    taskComment: number;
    commentText: string;
    submitedAt: Date;
}

export type commentAttributes = Optional<comment, 'id'>;

export class CommentInstance extends Model<comment, commentAttributes> implements comment {
    public id!: number;
    public userComment!: number;
    public taskComment!: number;
    public commentText!: string;
    public submitedAt!: Date;
}

const WorkloadComments = sequelize.define<CommentInstance>('workloadComments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userComment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'workload',
            key:'id'
        },
        onDelete: 'Cascade',
        onUpdate: 'Cascade'
    },
    taskComment: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    commentText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    submitedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    tableName: 'workloadComments',
    timestamps: false
});

export default WorkloadComments;