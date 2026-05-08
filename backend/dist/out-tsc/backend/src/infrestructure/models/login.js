import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
//  IUserAttributes da todo lo que debe tener la BD
export class UserInstance extends Model {
}
// Aqui se "copia" la base de datos de SQL para hacer consultas
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    passwordEncrypt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    intentosLogueo: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    ultimaActividad: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
    },
    activo: {
        type: DataTypes.INTEGER,
        defaultValue: true,
        allowNull: false
    },
    bloqueado: {
        type: DataTypes.INTEGER,
        defaultValue: false,
        allowNull: false
    }
}, {
    tableName: 'loginUsuarios',
    timestamps: false
});
export default User;
//# sourceMappingURL=login.js.map