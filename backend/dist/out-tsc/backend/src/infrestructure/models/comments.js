import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
import User from './users';
import Workload from './workloads';
export class CommentInstance extends Model {
}
const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    workload_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Workload,
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
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
//# sourceMappingURL=comments.js.map