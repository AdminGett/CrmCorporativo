import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
import User from './register';
import Workload from './workloads';

export interface IComment {
  id: string;
  workload_id: string;
  user_id: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

export type CommentCreationAttributes = Optional<IComment, 'id' | 'created_at' | 'updated_at'>;

export class CommentInstance extends Model<IComment, CommentCreationAttributes> implements IComment {
  public id!: string;
  public workload_id!: string;
  public user_id!: string;
  public content!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

const Comment = sequelize.define<CommentInstance>('Comment', {
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
workload_id: {
    type: DataTypes.INTEGER,
    allowNull: false
},
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
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
  tableName: 'comments',
  timestamps: false
});

// Asociaciones
Comment.belongsTo(User, { as: 'author', foreignKey: 'user_id' });
Comment.belongsTo(Workload, { foreignKey: 'workload_id' });
Workload.hasMany(Comment, { foreignKey: 'workload_id' });

export default Comment;