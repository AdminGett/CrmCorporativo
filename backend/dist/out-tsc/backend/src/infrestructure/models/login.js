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
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    materno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    ultimaActividad: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    bloqueado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    tableName: 'Usuarios',
    timestamps: false
});
export default User;
//# sourceMappingURL=login.js.map