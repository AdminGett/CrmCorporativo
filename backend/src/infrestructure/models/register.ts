import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/connection';

//  Dtos que se usaran 
export interface IUserRegister {
    userId: number;
    passwordEncrypt: string;
    nombre: string;
    paterno: string;
    materno: string;
    fechaNacimiento: Date;
    domicilio: string;
    nss: string;
    codigoPostal: string;
    estado: string;
    pais: string;
    fechaRegistro?: Date;
    tipoUsuario: number;
    activo?: number;
}

export type UserCreationAttributes = Optional<IUserRegister, 'userId' | 'fechaRegistro' | 'activo'>;


//  IUserAttributes da todo lo que debe tener la BD
export class UserInstance extends Model<IUserRegister, UserCreationAttributes> implements IUserRegister {
    public userId!: number;
    public passwordEncrypt!: string;
    public nombre!: string;
    public paterno!: string;
    public materno!: string;
    public fechaNacimiento!: Date;
    public domicilio!: string;
    public nss!: string;
    public codigoPostal!: string;
    public estado!: string;
    public pais!: string;
    public fechaRegistro!: Date;
    public tipoUsuario!: number;
    public activo!: number;
}

// Aqui se "copia" la base de datos de SQL para hacer consultas
const User = sequelize.define<UserInstance>('User', {
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
    activo:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: 'userProfile',
    timestamps: false
});

export default User;