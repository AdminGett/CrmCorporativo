import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';
//  IUserAttributes da todo lo que debe tener la BD
export class UserInstance extends Model {
}
// Aqui se "copia" la base de datos de SQL para hacer consultas
const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'userId'
    },
    passwordEncrypt: {
        type: DataTypes.STRING,
        allowNull: false
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
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    domicilio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nss: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigoPostal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    tipoUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activo: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'userProfile',
    timestamps: false
});
export default User;
//# sourceMappingURL=register.js.map