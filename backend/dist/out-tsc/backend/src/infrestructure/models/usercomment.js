import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
export class CommentInstance extends Model {
}
const CommentModel = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    workload_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'comments',
    timestamps: true
});
export default CommentModel;
//# sourceMappingURL=usercomment.js.map