import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
export class SessionInstance extends Model {
}
const Session = sequelize.define('Session', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id'
        }
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'sessions',
    timestamps: false
});
export default Session;
//# sourceMappingURL=session.js.map