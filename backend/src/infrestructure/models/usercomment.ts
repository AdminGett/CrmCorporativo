import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/connection';

export interface Comment {
    id: number;
    workload_id: number;
    user_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export type CommentCreationAttributes = Optional<Comment, 'id' | 'created_at' | 'updated_at'>;

export class CommentInstance extends Model<Comment, CommentCreationAttributes> implements Comment {
    public id!: number;
    public workload_id!: number;
    public user_id!: number;
    public content!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

const CommentModel = sequelize.define<CommentInstance>('Comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    workload_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW }
}, {
    tableName: 'comments',
    timestamps: false
});

export default CommentModel;