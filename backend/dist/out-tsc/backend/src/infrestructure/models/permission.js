import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/connection";
export class PermissionInstance extends Model {
}
const permission = sequelize.define('permission', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    allowed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
}, {
    tableName: 'permissions',
    timestamps: false
});
export default permission;
//# sourceMappingURL=permission.js.map